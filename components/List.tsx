import { PortfolioItem } from 'data/adapters/types';
import React, { useMemo, useState } from 'react';
import { filteredPortfolioValue } from 'utils';
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
  hideNative: boolean;
}

const totalTreasury = (protocol: any, hideNative: boolean) => hideNative ? protocol.results.currentTreasuryUSD - filteredPortfolioValue(protocol.results.currentTreasuryPortfolio, { native: true }) : protocol.results.currentTreasuryUSD
const totalLiquid = (protocol: any, hideNative: boolean) => hideNative ? protocol.results.currentTreasuryUSD - filteredPortfolioValue(protocol.results.currentTreasuryPortfolio, { native: true, vesting: false }) : protocol.results.currentLiquidTreasuryUSD

const sortTotal = (a: any, b: any, hideNative: boolean) => totalTreasury(b, hideNative) - totalTreasury(a, hideNative)
const sortLiquid = (a: any, b: any, hideNative: boolean) => totalLiquid(b, hideNative) - totalLiquid(a, hideNative)

const List: React.FC<ListProps> = ({ data, hideNative }) => {
  const [sort, setSort] = useState('total');

  const sortedData = useMemo(() => data.sort((a, b) => sort === 'total' ? sortTotal(a, b, hideNative) : sortLiquid(a, b, hideNative)), [data, hideNative]);

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
        <Row protocol={protocol} key={protocol.id} hideNative={hideNative} />
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
