import { OrganizationData } from '../types'
import { getDGTreasury } from '../utils/zerion'

export async function getDGData(): Promise<OrganizationData> {
  const treasuryValue = await getDGTreasury()

  return {
    id: 'dg',
    name: 'Decentral Games',
    category: 'l1',
    treasury: treasuryValue,
  };
}
