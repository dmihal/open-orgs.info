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

        <Button href={`https://twitter.com/share?ref_src=twsrc%5Etfw`} Icon={Share}>
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

        @media (max-width: 700px) {
          .toolbar {
            flex-direction: column-reverse;
          }
        }
      `}</style>
    </div>
  );
};

export default Toolbar;
