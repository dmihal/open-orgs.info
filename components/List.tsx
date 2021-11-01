import React, { useState } from 'react';
import { PortfolioItem } from 'data/adapters/types';
import Row from './Row';

interface ListProps {
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
  }[];
}

const sortTotal = (a: any, b: any) => b.results.currentTreasuryUSD - a.results.currentTreasuryUSD
const sortLiquid = (a: any, b: any) => b.results.currentLiquidTreasuryUSD - a.results.currentLiquidTreasuryUSD

const List: React.FC<ListProps> = ({ data }) => {
  const [sort, setSort] = useState('total');
  const sortedData = data.sort(sort === 'total' ? sortTotal : sortLiquid);

  return (
    <div className="list">
      <div className="header">
        <div className="name">Name</div>
        <div className="amount" onClick={() => setSort('total')}>
          {sort === 'total' && '▼'} Total Treasury
        </div>
        <div className="amount" onClick={() => setSort('liquid')}>
          {sort === 'liquid' && '▼'} Liquid Treasury
        </div>
      </div>

      {sortedData.map((protocol) => (
        <Row protocol={protocol} key={protocol.id} />
      ))}

      <style jsx>{`
        .list {
          border: solid 1px lightGray;
          border-radius: 0px;
          margin: 4px;
          max-width: 700px;
          width: 100%;
        }

        .header {
          display: flex;
          padding: 0 4px;
          border-bottom: solid 1px lightGray;
          background: #eee;
          font-weight: 500;
          padding-left: 10px;
        }

        .header .amount:hover {
          cursor: pointer;
          background: #eee;
        }

        .item {
          display: flex;
          padding: 0 4px;
          background-color: #fff;
          font-size: 18px;
          background-repeat: no-repeat;
          background-position: 10px center;
          background-size: 20px 20px;
          padding-left: 10px;
        }

        .item.app {
          background-color: #fad3f6;
        }

        .item > div,
        .header > div {
          padding: 16px 32px;
        }

        .name {
          flex: 1;
        }

        .amount {
          min-width: 200px;
          text-align: right;
        }

        @media (max-width: 700px) {
          .header {
            padding-left: 28px;
            padding-right: 30px;
          }
          .header > div {
            font-size: 14px;
          }

          .amount {
            font-size: 16px;
            min-width: 110px;
          }
          .name {
            font-size: 14px;
          }
          .g {
            display: none;
          }

          .item {
            padding-left: 30px;
            padding-right: 0;
            background-position: 6px center;
          }

          .item > div,
          .header > div {
            padding: 8px 2px;
          }
        }
      `}</style>
    </div>
  );
};

export default List;
