import { createContext, useState, useEffect, useContext } from 'react';
import {
	useSupabaseClient,
	useUser,
	useSession,
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const Context = createContext();

const Provider = ({ children }) => {
	const supabase = useSupabaseClient();
	const [user, setUser] = useState(useUser());
	const session = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const getUserData = async () => {
			// I hate JS x2
			const {
				data: { user: sessionUser },
			} = await supabase.auth.getUser();

			if (sessionUser) {
				const { data: profile } = await supabase
					.from('profiles')
					.select(`*`)
					.eq('id', sessionUser.id)
					.single();

				if (profile.avatar_url) {
					const {
						data: { signedUrl: avatarUrl },
					} = await supabase.storage
						.from('avatars')
						.createSignedUrl(sessionUser.id, 60);

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

				setIsLoading(false);
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

	const login = async () => {
		const { error } = await supabase.auth.signInWithOtp({ email });
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
		isLoading,
		session,
	};

	return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUserData = () => useContext(Context);

export default Provider;
