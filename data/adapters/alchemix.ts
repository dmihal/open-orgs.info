import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const treasuryAddress = '0x8392f6669292fa56123f71949b52d883ae57e225';

export async function getAlchemixData(): Promise<OrganizationData> {
  const treasury = await getPortfolio(treasuryAddress)

  return {
    id: 'alchemix',
    name: 'Alchemix',
    category: 'l1',
    treasury: treasury,
  };
}
