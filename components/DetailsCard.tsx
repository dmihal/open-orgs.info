import React from 'react';
import Link from 'next/link';
import Attribute from './Attribute';
import Button from './Button';
import TreasuryBar from './TreasuryBar';

interface DetailsCardProps {
  protocol: any;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ protocol }) => {
  const sections = protocol.results.currentTreasuryPortfolio
    .map((item: any) => ({
      amount: item.value,
      name: item.symbol,
    }))
    .sort((a: any, b: any) => b.amount - a.amount)

  return (
    <div className="details-card">
      {sections && sections.length > 0 && (
        <TreasuryBar sections={sections} />
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

      <Attribute title="Treasury Addresses">
        {protocol.metadata.treasuries?.map((address: string) => (
          <div key={address}>
            <a href={`https://etherscan.io/address/${address}`} target="etherscan">{address}</a>
          </div>
        ))}
      </Attribute>

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
        .spacer {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default DetailsCard;
