import React from 'react';
import { Share, CheckSquare, Square } from 'react-feather';
import Button from './Button';
// import gtc from 'icons/gtc.svg';

// const showGitcoin = false;

// const GTCIcon: React.FC = () => (
//   <div className="gtc">
//     <style jsx>{`
//       .gtc {
//         background: url('${gtc}');
//         height: 18px;
//         width: 18px;
//         margin-right: 2px;
//         flex: 0 0 18px;
//       }
//     `}</style>
//   </div>
// );

interface ToolbarProps {
  showNative: boolean;
  onShowNativeChange: (showNative: boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  showNative,
  onShowNativeChange,
}) => {

  return (
    <div className="toolbar">

      <div className="buttons">
        {/* {showGitcoin && (
          <Button
            Icon={GTCIcon}
            target="gitcoin"
            href="https://gitcoin.co/grants/1624/cryptofeesinfo"
          >
            Support us on Gitcoin
          </Button>
        )} */}

        <Button
          href={`https://twitter.com/intent/tweet?text=${encodeURI(
              'OpenOrgs.info'
            )}&url=${encodeURI(window.location.href)}`}
            Icon={Share}>
          Share
        </Button>

        <Button onClick={() => onShowNativeChange(!showNative)} Icon={showNative ? CheckSquare : Square}>
          Show Native Assets
        </Button>

      </div>

      <style jsx>{`
        .toolbar {
          display: flex;
          justify-content: flex-end;
          align-self: stretch;
        }
        .buttons > :global(*) {
          margin-left: 4px;
        }
        .buttons {
          display: flex;
          justify-content: flex-end;
          align-self: stretch;
        }
        .label {
          font-size: 10px;
          display: flex;
          max-width: 150px;
          align-items: center;
          background: #eeeeee;
          padding: 2px;
          border-radius: 4px;
        }
        .label span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .label button {
          margin-left: 4px;
          background: transparent;
          border: none;
          outline: none;
          padding: 4px;
        }
        .label button:hover {
          background: #dedede;
        }

        @media (max-width: 700px) {
          .toolbar {
            flex-direction: column-reverse;
          }
          .tags {
            margin-top: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default Toolbar;
