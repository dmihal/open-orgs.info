import React from 'react';

export interface Section {
  amount: number
  name: string
  unitAmount?: number
  icon?: string
  vesting?: boolean
}

interface TreasuryBarProps {
  sections: Section[]
  total: number
}

function hashCode(str: string) {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

const pickColor = (str: string) => `hsl(${hashCode(str) % 360}, 100%, 80%)`

const TreasuryBar: React.FC<TreasuryBarProps> = ({ sections, total }) => {
  return (
    <div className="container">
      <div className="bar">
        {sections.map((section: Section) => {
          return (
            <div
              key={section.name}
              className={`section ${section.vesting ? 'vesting' : ''}`}
              style={{
                flex: section.amount,
                backgroundColor: pickColor(section.name),
              }}
            >
              {section.icon && (
                <div className="icon" style={{ backgroundImage: `url('${section.icon}')` }} />
              )}
              <div className="tooltip">
                <div>
                  {section.unitAmount?.toLocaleString('en-US', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 0,
                  })}
                  {' '}
                  {section.name}
                  {section.vesting && ' (Vesting)'}
                </div>
                <div>
                  {section.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  })}
                  {" ("}
                  {(section.amount * 100 / total).toLocaleString('en-US', {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  })}
                  %)
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <style jsx>{`
        .container {
          padding: 10px;
        }
        .bar {
          height: 30px;
          display: flex;
        }
        .section {
          position: relative;
          display: flex;
          box-shadow: inset 0px 0px 3px 0px rgb(123 123 123 / 25%);
        }
        .section.vesting {
          background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgb(70 82 152 / 30%) 10px, rgb(70 82 152 / 30%) 20px );
        }
        .icon {
          background-size: 20px;
          background-position: 6px center;
          background-repeat: no-repeat;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 40px;
          max-width: 100%;
        }
        .section:first-child, .section:first-child:before {
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        .section:last-child, .section:last-child:before, .section:last-child .icon {
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
        }
        .section:hover:before {
          content: '';
          background: rgb(120 120 120 / 20%);
          display: block;
          flex: 1;
        }
        .section:hover .tooltip {
          display: block;
        }

        .tooltip {
          display: none;
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);

          min-width: 120px;
          background-color: black;
          color: #fff;
          text-align: center;
          padding: 5px;
          border-radius: 6px;
          white-space: nowrap;
        }
      `}</style>
    </div>
  )
}

export default TreasuryBar
