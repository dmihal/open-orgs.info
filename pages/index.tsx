import React, { useState } from 'react'
import { NextPage, GetStaticProps } from 'next'
import 'data/adapters'
import sdk from 'data/sdk'
import List from 'components/List'
import SocialTags from 'components/SocialTags'
import { PortfolioItem } from 'data/adapters/types'

interface HomeProps {
  data: {
    id: string;
    name: string;
    results: {
      currentTreasuryUSD: number;
      currentLiquidTreasuryUSD: number;
      currentTreasuryPortfolio: PortfolioItem[];
      recentProposals: any[];
    };
    metadata: any;
  }[]
}

export const Home: NextPage<HomeProps> = ({ data }) => {
  const [hideNative, setHideNative] = useState(false);

  return (
    <div className="container">
      <SocialTags />

      <main>
        <h1 className="title">OpenOrgs.info</h1>

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

        <List data={data} hideNative={hideNative} />
      </main>

      <style jsx>{`
        .container {
          max-width: 100%;
        }

        main {
          padding: 2rem 0 3rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const list = sdk.getList('treasuries')

  const data = await list.executeQueriesWithMetadata([
    'currentTreasuryUSD',
    'currentLiquidTreasuryUSD',
    'currentTreasuryPortfolio',
    'recentProposals',
  ])

  return { props: { data }, revalidate: 60 };
};


export default Home;
