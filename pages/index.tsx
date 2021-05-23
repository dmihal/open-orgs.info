import React from 'react'
import Head from 'next/head'
import { NextPage, GetStaticProps } from 'next'
import { getAaveData } from 'data/adapters/aave'
import { getAlchemixData } from 'data/adapters/alchemix'
import { getAPI3Data } from 'data/adapters/api3'
import { getBadgerData } from 'data/adapters/badger'
import { getBalancerData } from 'data/adapters/balancer'
import { getBarnBridgeData } from 'data/adapters/barnbridge'
import { getCompoundData } from 'data/adapters/compound'
import { getDXDAOData } from 'data/adapters/dxdao'
import { getIndexData } from 'data/adapters/index'
import { getLinkswapData } from 'data/adapters/linkswap'
import { getMakerDAOData } from 'data/adapters/makerdao'
import { getNexusData } from 'data/adapters/nexus'
import { getSynthetixData } from 'data/adapters/synthetix'
import { getSushiData } from 'data/adapters/sushi'
import { getUniswapData } from 'data/adapters/uniswap'
import { getTornadoData } from 'data/adapters/tornado'
import { getYamData } from 'data/adapters/yam'
import { getYearnData } from 'data/adapters/yearn'
import { OrganizationData } from 'data/types'
import List from 'components/List'

interface HomeProps {
  data: OrganizationData[]
}

export const Home: NextPage<HomeProps> = ({ data }) => {
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

      <main>
        <h1 className="title">Open-Orgs.info</h1>

        <p className="description">
          DAOs are the new companies.<br />
          What's on their balance sheets?
        </p>

        <div>
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            className="twitter-share-button"
            data-show-count="true"
          >
            Tweet
          </a>
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>

        <List data={data} />
      </main>

      <footer>
        <div>
          Created by{' '}
          <a href="https://twitter.com/dmihal" target="twitter">
            David Mihal
          </a>
        </div>
        <div>
          Design help from{' '}
          <a href="https://twitter.com/hey_heey_heeey" target="twitter">
            @heyheeyheeey
          </a>
        </div>
        <div>
          <a href="https://cryptofees.info">cryptofees.info</a>
          {' | '}
          <a href="https://ethereumnodes.com">ethereumnodes.com</a>
          {' | '}
          <a href="https://money-movers.info">money-movers.info</a>
          {' | '}
          <a href="https://stakers.info">stakers.info</a>
          {' | '}
          <b>open-orgs.info</b>
        </div>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 2rem 0 3rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: auto;
          border-top: 1px solid lightGray;
          text-align: center;
          padding: 2rem 0;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0 0 16px;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
          max-width: 800px;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          margin: 4px 0 20px;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
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

export const getStaticProps: GetStaticProps = async () => {
  const handleFailure = (e: any) => {
    console.warn(e);
    return null;
  };

  const data2 = await Promise.all([
    getAaveData().catch(handleFailure),
    getAlchemixData().catch(handleFailure),
    getAPI3Data().catch(handleFailure),
    getBadgerData().catch(handleFailure),
    getBalancerData().catch(handleFailure),
    getBarnBridgeData().catch(handleFailure),
    getCompoundData().catch(handleFailure),
    // getDGData().catch(handleFailure),
    getDXDAOData().catch(handleFailure),
    getIndexData().catch(handleFailure),
    getLinkswapData().catch(handleFailure),
    getMakerDAOData().catch(handleFailure),
    getNexusData().catch(handleFailure),
    getSushiData().catch(handleFailure),
    getSynthetixData().catch(handleFailure),
    getTornadoData().catch(handleFailure),
    getUniswapData().catch(handleFailure),
    getYearnData().catch(handleFailure),
    getYamData().catch(handleFailure),
  ]);

  const data = data2.filter((val: any) => !!val);

  return { props: { data }, revalidate: 60 };
};

export default Home;
