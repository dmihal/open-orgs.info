import { Context } from '@cryptostats/sdk'
import { getSnapshotProposals } from './snapshot'

const TREASURY_ADDRESS = '0xfedC4dD5247B93feb41e899A09C44cFaBec29Cbc'

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
    const portfolio = await getTresuryPortfolio()

    const withVesting = portfolio.portfolio.map((item: any) => item.symbol === 'vBZRX' ? {
        ...item,
        vesting: true,
      } : item)

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
