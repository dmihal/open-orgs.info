import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const ecosystemFund = '0xb618F903ad1d00d6F7b92f5b0954DcdC056fC533';

export async function getBalancerData(): Promise<OrganizationData> {
  const ecosystemFundTreasury = await getPortfolio(ecosystemFund)

  return {
    id: 'balancer',
    name: 'Balancer',
    category: 'l1',
    treasury: ecosystemFundTreasury,
  };
}
