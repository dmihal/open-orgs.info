import { Context } from '@cryptostats/sdk'

const VAT_ADDRESS = '0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b'
const PAUSE_ADDRESS = '0xbe8e3e3618f7474f8cb1d074a26affef007e98fb'

const vatABI = [
  'function dai(address holder) external view returns (uint256)',
  'function sin(address holder) external view returns (uint256)',
]

export async function setup(sdk: Context) {
  const getTreasuryInUSD = async () => {
    const vat = sdk.ethers.getContract(VAT_ADDRESS, vatABI)
    const [dai, sin, pauseValue] = await Promise.all([
      vat.dai('0xA950524441892A31ebddF91d3cEEFa04Bf454466'),
      vat.dai('0xA950524441892A31ebddF91d3cEEFa04Bf454466'),
      sdk.plugins.getPlugin('zerion').getPortfolio(PAUSE_ADDRESS),
    ])

    const daiSurplus = dai.sub(sin).toString() / 1e45

    return daiSurplus + pauseValue
  }

  sdk.register({
    id: 'makerdao',
    queries: {
      currentTreasuryUSD: getTreasuryInUSD,
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
