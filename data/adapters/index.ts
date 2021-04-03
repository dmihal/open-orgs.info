import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const treasury = '0x9467cfADC9DE245010dF95Ec6a585A506A8ad5FC';

export async function getIndexData(): Promise<OrganizationData> {
  const treasuryValue = await getPortfolio(treasury)

  return {
    id: 'index',
    name: 'Index Coop',
    category: 'l1',
    treasury: treasuryValue,
  };
}
