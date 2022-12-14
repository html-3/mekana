import { useSession } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import { useUserData } from '../context/user';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function ProfilePage({ currentUser, initialCompletion, session }) {
	const [completion, setCompletion] = useState(initialCompletion);
	console.log(completion);

	return (
		<Profile
			session={session}
			initialUser={currentUser}
			onCompletion={setCompletion}
			completion={completion}
		/>
	);
}

export async function getServerSideProps(context) {
	const supabase = createServerSupabaseClient(context);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session)
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};

	const { data: profile, error } = await supabase
		.from('profiles')
		.select(`*`)
		.eq('id', session.user.id)
		.single();

	if (error)
		return {
			props: {
				currentUser: {
					id: session.user.id,
					full_name: '',
					username: '',
					avatar_url: '',
				},
				completion: false,
				session: session,
			},
		};
	else {
		return {
			props: {
				currentUser: {
					id: session.user.id || '',
					username: profile.username || '',
					full_name: profile.full_name || '',
					avatar_url: profile.avatar_url || '',
				},
				initialCompletion: Boolean(profile.full_name && profile.avatar_url && profile.username),
				session: session,
			},
		};
	}
}
