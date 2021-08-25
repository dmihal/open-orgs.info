import React from 'react';

interface Section {
  amount: number
  name: string
}

interface TreasuryBarProps {
  sections: Section[]
}

function hashCode(str: string) {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

const pickColor = (str: string) => `hsl(${hashCode(str) % 360}, 100%, 80%)`

const TreasuryBar: React.FC<TreasuryBarProps> = ({ sections }) => {
  return (
    <div className="container">
      <div className="bar">
        {sections.map((section: Section) => {
          return (
            <div
              className="section"
              style={{ flex: section.amount, background: pickColor(section.name) }}
            >
              {section.name}
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
          background: red;
        }
        .section:first-child {
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        .section:last-child {
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
        }
      `}</style>
    </div>
  )
}

export default TreasuryBar
