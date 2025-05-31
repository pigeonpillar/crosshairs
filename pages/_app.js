// pages/_app.js
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Teal‐square favicon (replace with your own PNG if you prefer) */}
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
