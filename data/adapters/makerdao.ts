import { Context } from '@cryptostats/sdk'

const VAT_ADDRESS = '0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b'
const PAUSE_ADDRESS = '0xbe8e3e3618f7474f8cb1d074a26affef007e98fb'

const vatABI = [
  'function dai(address holder) external view returns (uint256)',
  'function sin(address holder) external view returns (uint256)',
]

export async function setup(sdk: Context) {
  const getDaiSurplus = async () => {
    const vat = sdk.ethers.getContract(VAT_ADDRESS, vatABI)
    const [dai, sin] = await Promise.all([
      vat.dai('0xA950524441892A31ebddF91d3cEEFa04Bf454466'),
      vat.sin('0xA950524441892A31ebddF91d3cEEFa04Bf454466'),
    ])

    const daiSurplus = dai.sub(sin).toString() / 1e45
    return daiSurplus
  }

  const getTreasuryInUSD = async () => {
    const [daiSurplus, pauseValue] = await Promise.all([
      getDaiSurplus(),
      sdk.plugins.getPlugin('zerion').getTotalValue(PAUSE_ADDRESS),
    ])

    return daiSurplus + pauseValue
  }

  const getPortfolio = async () => {
    const [pausePortfolio, daiSurplus] = await Promise.all([
      sdk.plugins.getPlugin('zerion').getPortfolio(PAUSE_ADDRESS),
      getDaiSurplus(),
    ])

    return [
      ...pausePortfolio,
      {
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        amount: daiSurplus,
        name: 'Dai Stablecoin',
        symbol: 'DAI',
        icon: 'https://s3.amazonaws.com/token-icons/0x6b175474e89094c44da98b954eedeac495271d0f.png',
        price: 1,
        value: daiSurplus
      },
    ]
  }

  sdk.register({
    id: 'makerdao',
    queries: {
      currentTreasuryUSD: getTreasuryInUSD,
      currentTreasuryPortfolio: getPortfolio,
    },
    metadata: {
      icon: sdk.ipfs.getDataURILoader('QmNuxELX7oWXJtJKveaCFDC7niZ4APtkWgPn1NZm2FLSJV', 'image/svg+xml'),
      category: 'app',
      name: 'MakerDAO',
      website: 'https://makerdao.com',
      governanceSite: 'https://vote.makerdao.com',
      governanceForum: 'https://forum.makerdao.com',
      governanceModel: '',
    },
  })
}
