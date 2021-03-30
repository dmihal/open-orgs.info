import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const treasury = '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b';

export async function getCompoundData(): Promise<OrganizationData> {
  const treasuryValue = await getPortfolio(treasury)

  return {
    id: 'compound',
    name: 'Compound',
    category: 'l1',
    treasury: treasuryValue,
  };
}
