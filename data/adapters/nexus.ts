import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const treasury = '0x586b9b2F8010b284A0197f392156f1A7Eb5e86e9';

export async function getNexusData(): Promise<OrganizationData> {
  const totalValue = await getPortfolio(treasury)

  return {
    id: 'nexus',
    name: 'Nexus Mutual',
    category: 'l1',
    treasury: totalValue,
  };
}
