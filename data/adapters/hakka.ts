import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const hakkaGuildBank = '0x83D0D842e6DB3B020f384a2af11bD14787BEC8E7';

export async function getHakkaData(): Promise<OrganizationData> {
  const totalValue = await getPortfolio(hakkaGuildBank)

  return {
    id: 'hakka',
    name: 'Hakka Finance',
    category: 'l1',
    treasury: totalValue,
  };
}
