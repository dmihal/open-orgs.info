import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const treasury = '0xE69A81b96FBF5Cb6CAe95d2cE5323Eff2bA0EAE4';

export async function getLinkswapData(): Promise<OrganizationData> {
  const treasuryValue = await getPortfolio(treasury)

  return {
    id: 'linkswap',
    name: 'Linkswap',
    category: 'l1',
    treasury: treasuryValue,
  };
}
