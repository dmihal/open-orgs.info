import React from 'react';
import Link from 'next/link';
import Attribute from './Attribute';
import Button from './Button';
import TreasuryBar from './TreasuryBar'
import { portfolioToSections } from 'utils'
import { PortfolioItem } from 'data/adapters/types';

interface DetailsCardProps {
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
  hideNative: boolean
}

const DetailsCard: React.FC<DetailsCardProps> = ({ protocol, hideNative }) => {
  const { total, sections } = portfolioToSections(protocol.results.currentTreasuryPortfolio, hideNative ? {native: false} : {})

  return (
    <div className="details-card">
      {sections && sections.length > 0 && (
        <TreasuryBar sections={sections} total={total} />
      )}

      {protocol.metadata.description && (
        <Attribute title="">{protocol.metadata.description}</Attribute>
      )}

      {protocol.metadata.website && (
        <Attribute title="Website">
          <a href={protocol.metadata.website} target="website">
            {protocol.metadata.website.replace('https://', '')}
          </a>
        </Attribute>
      )}

      {protocol.metadata.governanceSite && (
        <Attribute title="Governance Site">
          <a href={protocol.metadata.governanceSite} target="website">
            {protocol.metadata.governanceSite.replace('https://', '')}
          </a>
        </Attribute>
      )}

      {protocol.metadata.governanceForum && (
        <Attribute title="Governance Forum">
          <a href={protocol.metadata.governanceForum} target="website">
            {protocol.metadata.governanceForum.replace('https://', '')}
          </a>
        </Attribute>
      )}

      {protocol.results.recentProposals.length > 0 && (
        <Attribute title="Most recent proposal">
          <a href={protocol.results.recentProposals[0].link} target="gov" className="proposalLink">
            {protocol.results.recentProposals[0].title}
          </a>
        </Attribute>
      )}

      <div className="spacer" />

      <div>
        <Link href={`/organization/${protocol.id}`} passHref>
          <Button>More Details</Button>
        </Link>
      </div>

      <style jsx>{`
        .details-card {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .description {
          margin: 4px 0;
        }
        .row {
          display: flex;
        }
        .row > :global(div) {
          flex: 1;
        }

        .proposalLink {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .spacer {
          flex: 1;
        }
      `}</style>
    </div>
  )
}

export default DetailsCard
