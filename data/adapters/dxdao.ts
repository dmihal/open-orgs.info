import { Context } from '@cryptostats/sdk'

const TREASURY_ADDRESS = '0x519b70055af55a007110b4ff99b0ea33071c720a'
const DXD_TOKEN = '0xa1d65e8fb6e87b60feccbc582f7f97804b725521'
const USDC_TOKEN = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

export async function setup(sdk: Context) {
  let treasuryPortfolioPromise: Promise<any> | null
  const getTreasuryPortfolio = (): Promise<any> => {
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

  const getBondingCurve = async () => {
    const [dxdPrice, dxdBalance, usdcBalance] = await Promise.all([
      sdk.coinGecko.getCurrentPrice('dxdao'),
      sdk.ethers.getERC20Contract(DXD_TOKEN).balanceOf(DXD_TOKEN),
      sdk.ethers.getERC20Contract(USDC_TOKEN).balanceOf(DXD_TOKEN),
    ])

    const totalValue = (usdcBalance.toString() / 1e6) + (dxdPrice * dxdBalance.toString() / 1e18)
    const portfolio = [
      {
        address: USDC_TOKEN,
        amount: usdcBalance.toString() / 1e6,
        value: usdcBalance.toString() / 1e6,
        price: 1,
        name: 'USDC',
        symbol: 'USDC',
        icon: `https://s3.amazonaws.com/token-icons/${USDC_TOKEN}.png`,
        native: false,
        vesting: false
      },
      {
        address: DXD_TOKEN,
        amount: dxdBalance.toString() / 1e18,
        value: dxdPrice * dxdBalance.toString() / 1e18,
        price: dxdPrice,
        name: 'DXdao',
        symbol: 'DXD',
        icon: `https://s3.amazonaws.com/token-icons/${DXD_TOKEN}.png`,
        native: true,
        vesting: false
      },
    ]

    return { totalValue, portfolio }
  }

  const getTreasuryInUSD = async () => {
    const [treasury, { totalValue: bondingCurveVal }] = await Promise.all([
      getTreasuryPortfolio(),
      getBondingCurve(),
    ])

    return treasury.totalValue + bondingCurveVal
  }

  const getPortfolio = async () => {
    const [{ portfolio: reservePortfolio }, { portfolio: bondingCurvePortfolio }] = await Promise.all([
      getTreasuryPortfolio(),
      getBondingCurve(),
    ])

    return [
      ...reservePortfolio.map((portfolioItem: any) => ({ ...portfolioItem, native: portfolioItem.address === DXD_TOKEN })),
      ...bondingCurvePortfolio
    ]
  }

  sdk.register({
    id: 'dxdao',
    queries: {
      currentTreasuryUSD: getTreasuryInUSD,
      currentLiquidTreasuryUSD: getTreasuryInUSD,
      currentTreasuryPortfolio: getPortfolio,
      recentProposals: async () => [],
    },
    metadata: {
      icon: sdk.ipfs.getDataURILoader('QmVvZF3qMp8fx9dpYvkCMV849U6oLaKJJA5BxxUCmabvb4', 'image/svg+xml'),
      name: 'DXdao',
      description: 'DXdao is a decentralized collective that builds and governs decentralized products and services.',
      website: 'https://dxdao.eth.link',
      governanceSite: 'https://alchemy.daostack.io/dao/0x519b70055af55a007110b4ff99b0ea33071c720a',
      governanceForum: 'https://daotalk.org/c/dx-dao',
      governanceModel: '',
      treasuries: [TREASURY_ADDRESS, DXD_TOKEN],
    },
  })
}
