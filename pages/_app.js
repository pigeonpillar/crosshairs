// pages/_app.js
import Head from 'next/head';
import '../styles/global.css';
import '../styles/fonts.css';  // This must now find styles/fonts.css successfully

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Example favicon, if you have one */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
