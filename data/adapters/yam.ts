import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const treasury = '0x97990B693835da58A281636296D2Bf02787DEa17';

export async function getYamData(): Promise<OrganizationData> {
  const totalValue = await getPortfolio(treasury)

  return {
    id: 'yam',
    name: 'Yam Finance',
    category: 'l1',
    treasury: totalValue,
  };
}
