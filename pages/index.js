import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import Home from '../components/Home';
import LandingPage from '../components/LandingPage';

export default function HomePage({ profile }) {
	const session = useSession();

	return <>{session ? <Home /> : <LandingPage />}</>;
}

export async function getServerSideProps(context) {
	const supabase = createServerSupabaseClient(context);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) return { props: {} };

	const { data: profile } = await supabase
		.from('profiles')
		.select(`*`)
		.eq('id', session.user.id)
		.single();

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
