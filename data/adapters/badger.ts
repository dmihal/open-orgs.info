import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const treasury = '0x4441776e6a5d61fa024a5117bfc26b953ad1f425';

export async function getBadgerData(): Promise<OrganizationData> {
  const treasuryValue = await getPortfolio(treasury)

  return {
    id: 'badger',
    name: 'Badger',
    category: 'l1',
    treasury: treasuryValue,
  };
}
