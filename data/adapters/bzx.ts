import { Context } from '@cryptostats/sdk'
import { getSnapshotProposals } from './snapshot'

const TREASURY_ADDRESS = '0xfedC4dD5247B93feb41e899A09C44cFaBec29Cbc'

const NATIVE_TOKENS = ['0x56d811088235f11c8920698a204a5010a788f4b3', '0xb72b31907c1c95f3650b64b2469e08edacee5e8f'];

export async function setup(sdk: Context) {
  let treasuryPortfolioPromise: Promise<any> | null
  const getTresuryPortfolio = (): Promise<any> => {
    if (!treasuryPortfolioPromise) {
      treasuryPortfolioPromise = fetch(`https://zerion-api.vercel.app/api/portfolio/${TREASURY_ADDRESS}`)
        .then(req => req.json())
        .then(result => {
          if (result.success) {
            return result.value
          }
          throw new Error(result.error)
        })
    }
    return treasuryPortfolioPromise
  }

  const getTreasuryInUSD = async () => {
    const treasury = await getTresuryPortfolio()
    return treasury.totalValue
  }

  const getPortfolio = async () => {
    const { portfolio } = await getTresuryPortfolio()

    const withVesting = portfolio
      .map((portfolioItem: any) => (
        {
          ...portfolioItem,
          native: NATIVE_TOKENS.includes(portfolioItem.address),
          vesting: portfolioItem.symbol === 'vBZRX'
        }
      ))

    return withVesting
  }

  const getLiquidTreasuryInUSD = async () => {
    const portfolio = await getPortfolio()

    const liquidTreasury = portfolio
      .filter((item: any) => item.symbol !== 'vBZRX')
      .reduce((acc: number, item: any) => acc + item.value, 0)

    return liquidTreasury
  }

  sdk.register({
    id: 'bzx',
    queries: {
      currentTreasuryUSD: getTreasuryInUSD,
      currentLiquidTreasuryUSD: getLiquidTreasuryInUSD,
      currentTreasuryPortfolio: getPortfolio,
      recentProposals: () => getSnapshotProposals(sdk, 'bzx.eth'),
    },
    metadata: {
      name: 'bZx',
      icon: sdk.ipfs.getDataURILoader('QmVwmVxRL9PBJKoeVEMdnGLEdvNnsgEfJqNn5tywaRTTK5', 'image/svg+xml'),
      website: 'https://bzx.network',
      governanceForum: 'https://forum.bzx.network',
      governanceSite: 'https://snapshot.org/#/bzx.eth',
      treasuries: [TREASURY_ADDRESS],
    },
  })
}
