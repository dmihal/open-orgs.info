import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const sushiTreasury = '0xe94b5eec1fa96ceecbd33ef5baa8d00e4493f4f3';

export async function getSushiData(): Promise<OrganizationData> {
  const totalValue = await getPortfolio(sushiTreasury)

  return {
    id: 'sushi',
    name: 'SushiSwap',
    category: 'l1',
    treasury: totalValue,
  };
}
