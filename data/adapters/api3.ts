import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const treasuryAddress = '0xe7aF7c5982e073aC6525a34821fe1B3e8E432099';

export async function getAPI3Data(): Promise<OrganizationData> {
  const treasury = await getPortfolio(treasuryAddress)

  return {
    id: 'api3',
    name: 'API3',
    category: 'l1',
    treasury: treasury,
  };
}
