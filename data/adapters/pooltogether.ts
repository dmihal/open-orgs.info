import { Context } from '@cryptostats/sdk'

const TREASURY_ADDRESS = '0x42cd8312D2BCe04277dD5161832460e95b24262E'
const VESTING_ADDRESS = '0x21950E281bDE1714ffd1062ed17c56D4D8de2359'
const SCUSDC_TOKEN = '0x391a437196c81eea7bbbbd5ed4df6b49de4f5c96'

export async function setup(sdk: Context) {
  const getSCUSDC = async () => {
    const balance = await sdk.ethers.getERC20Contract(SCUSDC_TOKEN).balanceOf(TREASURY_ADDRESS)
    return balance.toString() / 1e6
  }

  const getTreasuryInUSD = async () => {
    const [treasuryValue, vestingValue, scusdc] = await Promise.all([
      sdk.plugins.getPlugin('zerion').getTotalValue(TREASURY_ADDRESS),
      sdk.plugins.getPlugin('zerion').getTotalValue(VESTING_ADDRESS),
      getSCUSDC(),
    ])

    return treasuryValue + vestingValue + scusdc
  }

  const getLiquidTreasuryInUSD = async () => {
    const [treasuryValue, scusdc] = await Promise.all([
      sdk.plugins.getPlugin('zerion').getTotalValue(TREASURY_ADDRESS),
      getSCUSDC(),
    ])

    return treasuryValue + scusdc
  }

  const getPortfolio = async () => {
    const [treasury, vesting, scusdc] = await Promise.all([
      sdk.plugins.getPlugin('zerion').getPortfolio(TREASURY_ADDRESS),
      sdk.plugins.getPlugin('zerion').getPortfolio(TREASURY_ADDRESS),
      getSCUSDC(),
    ])

    return [
      ...treasury,
      ...vesting.map((portfolioItem: any) => ({ ...portfolioItem, vesting: true })),
      {
        address: SCUSDC_TOKEN,
        amount: scusdc,
        value: scusdc,
        price: 1,
        name: 'PoolTogether USDC Sponsorship',
        symbol: 'ScUSDC',
        icon: null,
      },
    ]
  }

  sdk.register({
    id: 'pooltogether',
    queries: {
      currentTreasuryUSD: getTreasuryInUSD,
      currentLiquidTreasuryUSD: getLiquidTreasuryInUSD,
      currentTreasuryPortfolio: getPortfolio,
      recentProposals: async () => [],
    },
    metadata: {
      icon: sdk.ipfs.getDataURILoader('QmUCxUzEuxbnGT31rXnCGfefr4a768YCkV6yfBWeSdSTPX', 'image/svg+xml'),
      name: 'PoolTogether',
      website: 'https://pooltogether.com',
      governanceSite: 'https://vote.pooltogether.com/',
      treasuries: [TREASURY_ADDRESS, VESTING_ADDRESS],
    },
  })
}
