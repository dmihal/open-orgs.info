import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'
import { getEthplorerPortfolio } from '../utils/ethplorer'

const ecosystemReserve = '0x25F2226B597E8F9514B3F68F00f494cF4f286491';
const revenueCollector = '0x464C71f6c2F760DdA6093dCB91C24c39e5d6e18c';

export async function getAaveData(): Promise<OrganizationData> {
  const ecosystemReserveTreasury = await getPortfolio(ecosystemReserve)

  // The revenue collector has too many txs to be supported by Zerion
  const revenueCollectorTreasury = await getEthplorerPortfolio(revenueCollector)
  console.log(revenueCollectorTreasury)

  return {
    id: 'aave',
    name: 'Aave',
    category: 'l1',
    treasury: ecosystemReserveTreasury + revenueCollectorTreasury,
  };
}
