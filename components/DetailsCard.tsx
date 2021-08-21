import React from 'react';
import Link from 'next/link';
// import Attribute from './Attribute';
import Button from './Button';

interface DetailsCardProps {
  protocol: any;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ protocol }) => {
  return (
    <div className="details-card">
      <div>Test</div>

      <div className="spacer" />

      <div>
        <Link href={`/protocol/${protocol.id}`} passHref>
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
