import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const treasury = '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b';
const resevoir = '0x2775b1c75658Be0F640272CCb8c72ac986009e38';

export async function getCompoundData(): Promise<OrganizationData> {
  const treasuryValue = await getPortfolio(treasury)
  const resevoirValue = await getPortfolio(resevoir)

  return {
    id: 'compound',
    name: 'Compound',
    category: 'l1',
    treasury: treasuryValue + resevoirValue,
  };
}
