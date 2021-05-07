import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const ecosystemFund = '0xb618F903ad1d00d6F7b92f5b0954DcdC056fC533';
const protocolFeeCollector = '0xce88686553686DA562CE7Cea497CE749DA109f9F';

export async function getBalancerData(): Promise<OrganizationData> {
  const ecosystemFundTreasury = await getPortfolio(ecosystemFund)
  const protocolFeeCollectorTreasury = await getPortfolio(protocolFeeCollector)

  return {
    id: 'balancer',
    name: 'Balancer',
    category: 'l1',
    treasury: ecosystemFundTreasury + protocolFeeCollectorTreasury,
  };
}
