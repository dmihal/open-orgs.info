import React from 'react'

interface ListProps {
  data: any[]
}

const sortByWeekly = (a: any, b: any) => b.results.currentTreasuryUSD - a.results.currentTreasuryUSD

const List: React.FC<ListProps> = ({ data }) => {
  const sortedData = data.sort(sortByWeekly)

  return (
    <div className="list">
      <div className="header">
        <div className="name">Name</div>
        <div className="amount">
          Treasury
        </div>
      </div>

      {sortedData.map((protocol: any) => (
        <div
          className={`item ${protocol.category}`}
          key={protocol.id}
          style={{
            backgroundImage: protocol.metadata.icon && `url('${protocol.metadata.icon}')`,
          }}
        >
          <div className="name">{protocol.metadata.name}</div>
          <div className="amount">
            {protocol.results.currentTreasuryUSD.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}
          </div>
        </div>
      ))}

      <style jsx>{`
        .list {
          border: solid 1px lightGray;
          border-radius: 0px;
          overflow: hidden;
          margin: 4px;
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
          min-width: 250px;
          text-align: right;
        }

        @media (max-width: 700px) {
          .header {
            padding-left: 30px;
          }
          .header > div {
            font-size: 14px;
          }

          .amount {
            font-size: 16px;
            min-width: 130px;
          }
          .name {
            font-size: 14px;
          }

          .item {
            padding-left: 30px;
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

export default List
