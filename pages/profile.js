import { useSession } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import { useUserData } from '../context/user';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function ProfilePage({ hasSession }) {
	const { user } = useUserData();
	const session = useSession();

	const [completion, setCompletion] = useState(false);

	useEffect(() => {
		if (!!user) {
			setCompletion(user.full_name && user.avatar_url && user.username);
		}
	}, []);

	return (
		<>
			<Profile
				session={session}
				onCompletion={setCompletion}
			/>
			{completion ? (
				<Link href='/'>
					<a className='button'>Voltar</a>
				</Link>
			) : null}
		</>
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

	return { props: { hasSession: false } };
}
