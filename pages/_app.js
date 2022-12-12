import { NavBar } from '../components/NavBar';
import { SEOHeader } from '../components/SEOHeader';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import '../styles/globals.css';
import UserProvider from '../context/user';

function MyApp({ Component, pageProps }) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());
	return (
		<>
			<SEOHeader />
			<SessionContextProvider
				supabaseClient={supabaseClient}
				initialSession={pageProps.initialSession}
			>
				<UserProvider>
					<NavBar />
					<main className='flex flex-col items-center'>
						<Component {...pageProps} />
					</main>
				</UserProvider>
			</SessionContextProvider>
		</>
	);
}

export default MyApp;
