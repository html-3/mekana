import { createContext, useState, useEffect, useContext } from 'react';
import { useSupabaseClient, useUser, useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const Context = createContext();

const Provider = ({ children }) => {
	// Supabase client
	const supabase = useSupabaseClient();
	// User data and state
	const [user, setUser] = useState(useUser());
	// Session state
	const session = useSession();
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const getUserData = async () => {
			// I hate JS x2
			const {
				data: { user: sessionUser },
			} = await supabase.auth.getUser();

			if (sessionUser) {
				setLoading(true);
				const { data: profile, error } = await supabase
					.from('profiles')
					.select(`*`)
					.eq('id', sessionUser.id)
					.single();

				if (!profile) {
					router.push('/auth') 
				} else if (!profile?.full_name || !profile?.avatar_url || !profile?.username) {
					 router.push('/profile') 
				} else if (profile.avatar_url) {
					const {
						data: { signedUrl: avatarUrl },
					} = await supabase.storage.from('avatars').createSignedUrl(sessionUser.id, 60);

					setUser({
						...sessionUser,
						...profile,
						...{ avatarUrl },
					});
				}
				setUser({
					...sessionUser,
					...profile,
				});

				setLoading(false);
			}
		};

		getUserData();

		supabase.auth.onAuthStateChange(() => {
			getUserData();
		});
		return () => {
			setUser(null);
		};
	}, []);

	const login = async ({ email }) => {
		const { error } = await supabase.auth.signInWithOtp({ email });
		return { error };
	};

	const logout = async () => {
		await supabase.auth.signOut();
		setUser(null);
		router.push('/');
	};

	const exposed = {
		user,
		login,
		logout,
		loading,
		session,
	};

	return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUserData = () => useContext(Context);

export default Provider;
