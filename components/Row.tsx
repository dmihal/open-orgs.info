import React, { Fragment, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactGA from 'react-ga4';
import { ChevronDown, ChevronUp } from 'react-feather';
import DetailsCard from './DetailsCard';
import RowName from './RowName';
import { filteredTreasuryValue } from 'utils';
import { PortfolioItem } from 'data/adapters/types';

interface RowProps {
  protocol: {
    id: string;
    name: string;
    results: {
      currentTreasuryUSD: number;
      currentLiquidTreasuryUSD: number;
      currentTreasuryPortfolio: PortfolioItem[];
      recentProposals: any[];
    };
    metadata: any;
  };
  showNative: boolean
}

const toggle = (isOpen: boolean) => !isOpen;

const cardHeight = 600;

const Row: React.FC<RowProps> = ({ protocol, showNative }) => {
  const [open, setOpen] = useState(false);

  // const isApp = protocol.category !== 'l1' && protocol.category !== 'l2';

  const currentTreasury = filteredTreasuryValue(protocol, showNative, true)
  const currentLiquidTreasury = filteredTreasuryValue(protocol, showNative, false)

  return (
    <Fragment>
      <a
        href={`/protocol/${protocol.id}`}
        onClick={(e: any) => {
          e.preventDefault();
          setOpen(toggle);
          ReactGA.event({
            category: 'Navigation',
            action: open ? 'Close details' : 'Open details',
            label: protocol.name,
          });
        }}
        className={`item ${/*isApp ? 'app' :*/ ''} ${open ? 'open' : ''}`}
        style={{
          backgroundImage: protocol.metadata.icon ? `url('${protocol.metadata.icon}')` : undefined,
        }}
      >
        <RowName
          name={protocol.metadata.name}
          shortName={protocol.metadata.shortName}
          subtitle={protocol.metadata.subtitle}
        />
        <div className="amount">
          {currentTreasury?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </div>
        <div className="amount">
          {currentLiquidTreasury?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </div>
        <div className="arrow">{open ? <ChevronUp /> : <ChevronDown />}</div>
      </a>

      <CSSTransition in={open} timeout={500} unmountOnExit>
        <div className="details-container">
          <DetailsCard protocol={protocol} showNative={showNative} />
        </div>
      </CSSTransition>
      <style jsx>{`
        .item {
          display: flex;
          padding: 0 4px;
          background-color: #fff;
          font-size: 18px;
          background-repeat: no-repeat;
          background-position: 10px center;
          background-size: 20px 20px;
          padding-left: 10px;
          color: black;
          text-decoration: none;
          align-items: center;
          height: 54px;
        }
        .item:hover {
          background-color: #f5f5f5;
        }

        .item.app {
          background-color: #fad3f6;
        }
        .item.app:hover {
          background-color: #f8c3f3;
        }

        .amount {
          padding-left: 32px;
        }

        .amount {
          min-width: 200px;
          text-align: right;
          font-family: 'Noto Sans TC', sans-serif;
        }

        .arrow {
          padding: 0 4px;
          height: 24px;
          opacity: 0.7;
        }

        @keyframes slidein {
          from {
            max-height: 0px;
          }

          to {
            max-height: ${cardHeight}px;
          }
        }

        @keyframes slideout {
          from {
            max-height: ${cardHeight}px;
          }

          to {
            max-height: 0px;
          }
        }

        .details-container {
          max-height: ${cardHeight}px;
          animation: 0.5s 1 slidein;

          border-top: solid 1px #e3e3e3;
          border-bottom: solid 1px #e3e3e3;
          display: flex;
          flex-direction: column;
        }

        .details-container.exit {
          max-height: 0;
          animation: 0.5s 1 slideout;
        }

        .details-container.exit, .details-container.enter {
          overflow: hidden;
        }

        @media (max-width: 700px) {
          .amount {
            font-size: 14px;
            min-width: 110px;
            padding-left: 8px;
          }

          .item {
            padding-left: 30px;
            background-position: 6px center;
          }

          .arrow {
            padding: 0 2px;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default Row;
