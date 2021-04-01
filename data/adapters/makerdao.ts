import { OrganizationData } from '../types'
import { ethers } from 'ethers'

const VAT_ADDRESS = '0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b'

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

  return {
    id: 'makerdao',
    name: 'MakerDAO',
    category: 'l1',
    treasury: parseFloat(value),
  }
}
