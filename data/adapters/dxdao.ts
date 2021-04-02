import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const treasury = '0x519b70055af55a007110b4ff99b0ea33071c720a';

export async function getDXDAOData(): Promise<OrganizationData> {
  const treasuryValue = await getPortfolio(treasury)

  return {
    id: 'dxdao',
    name: 'DXdao',
    category: 'l1',
    treasury: treasuryValue,
  };
}
