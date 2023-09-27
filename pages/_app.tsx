import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { SEOHead } from '../components/SEOHead';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEOHead />
      <div className='dark:bg-alt dark:text-main bg-main text-alt'>
        <Component {...pageProps} />
      </div>
    </>
  );
}
