import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import RegisterProfile from '../components/RegisterProfile';
import { useUserData } from '../context/user';

export default function AuthPage({ hasSession }) {
	const { session } = useUserData();
	const router = useRouter();

	useEffect(() => {
		if (!!session) router.push('/');
	}, [session]);

	return <>{!hasSession ? <RegisterProfile /> : null}</>;
}

export async function getServerSideProps(context) {
	const supabase = createServerSupabaseClient(context);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return { props: {} };
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`*`)
		.eq('id', session.id)

	if (!Boolean(profile.full_name && profile.avatar_url && profile.username)) {
		return {
			redirect: {
				destination: '/profile',
				permanent: false,
			},
		};
	}

	return { props: {} };
}
