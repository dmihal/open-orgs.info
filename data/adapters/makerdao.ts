import { ethers } from 'ethers'
import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const VAT_ADDRESS = '0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b'
const PAUSE_ADDRESS = '0xbe8e3e3618f7474f8cb1d074a26affef007e98fb'

const vatABI = [
  'function dai(address holder) external view returns (uint256)',
  'function sin(address holder) external view returns (uint256)',
]

export async function getMakerDAOData(): Promise<OrganizationData> {
  const provider = ethers.getDefaultProvider()
  const vat = new ethers.Contract(VAT_ADDRESS, vatABI, provider)

  const dai = await vat.dai('0xA950524441892A31ebddF91d3cEEFa04Bf454466')
  const sin = await vat.sin('0xA950524441892A31ebddF91d3cEEFa04Bf454466')
  const value = ethers.utils.formatUnits(dai.sub(sin), 45)

  const pauseValue = await getPortfolio(PAUSE_ADDRESS)

  return {
    id: 'makerdao',
    name: 'MakerDAO',
    category: 'l1',
    treasury: parseFloat(value) + pauseValue,
  }
}
