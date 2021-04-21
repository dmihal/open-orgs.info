import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const yearnTreasury = '0xfeb4acf3df3cdea7399794d0869ef76a6efaff52'; // ychad.eth

export async function getYearnData(): Promise<OrganizationData> {
  const totalValue = await getPortfolio(yearnTreasury)

  return {
    id: 'yearn',
    name: 'Yearn',
    category: 'l1',
    treasury: totalValue,
  };
}
