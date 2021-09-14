import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div>
        Created by{' '}
        <a href="https://twitter.com/dmihal" target="twitter">
          David Mihal
        </a>
      </div>
      <div>
        Design help from{' '}
        <a href="https://twitter.com/hey_heey_heeey" target="twitter">
          @heyheeyheeey
        </a>
      </div>
      <div>
        <a href="https://cryptofees.info">cryptofees.info</a>
        {' | '}
        <a href="https://ethereumnodes.com">ethereumnodes.com</a>
        {' | '}
        <a href="https://money-movers.info">money-movers.info</a>
        {' | '}
        <a href="https://stakers.info">stakers.info</a>
        {' | '}
        <b>open-orgs.info</b>
      </div>
      <style jsx>{`
        footer {
          width: 100%;
          height: auto;
          border-top: 1px solid lightGray;
          text-align: center;
          padding: 2rem 0;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      `}</style>
    </footer>
  )
}

export default Footer
