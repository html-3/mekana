import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { SEOHead } from '../components/SEOHead';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEOHead />
      <div className='flex flex-col items-center min-h-screen'>
        <Component {...pageProps} />
      </div>
    </>
  );
}
