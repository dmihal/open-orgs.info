import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const governanceAddress = '0x5efda50f22d34F262c29268506C5Fa42cB56A1Ce';
const vestingAddress = '0x179f48C78f57A3A78f0608cC9197B8972921d1D2';

export async function getTornadoData(): Promise<OrganizationData> {
  const governanceBalance = await getPortfolio(governanceAddress)
  const vestingBalance = await getPortfolio(vestingAddress)

  return {
    id: 'tornado',
    name: 'Tornado Cash',
    category: 'l1',
    treasury: governanceBalance + vestingBalance,
  };
}
