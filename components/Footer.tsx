import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div>Data updates continuously</div>
      <div>
        Created by{' '}
        <a href="https://twitter.com/dmihal" target="twitter">
          David Mihal
        </a>
      </div>

      <div>
        <b>open-orgs.info</b>
        {' | '}
        <a href="https://cryptofees.info">cryptofees.info</a>
        {' | '}
        <a href="https://ethburned.info">ethburned.info</a>
        {' | '}
        <a href="https://money-movers.info">money-movers.info</a>
        {' | '}
        <a href="https://l2fees.info">l2fees.info</a>
      </div>

      <style jsx>{`
        footer {
          width: 100%;
          height: auto;
          border-top: 1px solid lightGray;
          text-align: center;
          padding: 2rem 0;
        }
        footer > * {
          margin-bottom: 0.5em;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
