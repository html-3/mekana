import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Error from 'next/error';
import Link from 'next/link';

export default function SignOutButton() {
	const supabase = useSupabaseClient();

	const signOut = async (event) => {
		event.preventDefault();
		const { error } = await supabase.auth.signOut();

		if (error) {
			throw new Error(error);
		}
	};

	return (
		<button
			onClick={signOut}
			type='button'
			className='button'
		>
			<Link href='/'>Sair</Link>
		</button>
	);
}
