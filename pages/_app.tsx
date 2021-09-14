import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import PlausibleProvider from 'next-plausible'
import Footer from 'components/Footer'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="container">
      <Head>
        <title>Open-Orgs.info</title>
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <meta property="og:title" content="Open-Orgs.info" />
        <meta property="og:image" content="https://open-orgs.info/api/screenshot" />
        <meta
          property="og:description"
          content="DAOs are the new companies. What's on their balance sheets?"
        />

        <meta name="twitter:title" content="Open-Orgs.info" />
        <meta
          name="twitter:description"
          content="DAOs are the new companies. What's on their balance sheets?"
        />
        <meta
          name="twitter:image"
          content={`https://open-orgs.info/api/screenshot?${new Date().getDate()}`}
        />
        <meta name="twitter:card" content="summary_large_image" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-N4QYE453Z4" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());gtag('config', 'G-MB00YK06P7');`
          }}
        />
      </Head>

      <PlausibleProvider domain="open-orgs.info">
        <Component {...pageProps} />

        <Footer />
      </PlausibleProvider>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Noto Sans TC', sans-serif;
          background: #eeeeee;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default App;
