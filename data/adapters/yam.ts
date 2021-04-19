import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const treasury = '0x97990B693835da58A281636296D2Bf02787DEa17';
const sushiTreasury = '0xd67c05523d8ec1c60760fd017ef006b9f6e496d0';
const stakedDPI = '0x205cc7463267861002b27021c7108bc230603d0f';
const randomHoldings = '0xd67c05523d8ec1c60760fd017ef006b9f6e496d0';

export async function getYamData(): Promise<OrganizationData> {
  const [totalValue, sushiTreasury, totalStakedDPI, totalRandomHoldings] = await Promise.all([
    await getPortfolio(treasury),
    await getPortfolio(sushiTreasury),
    await getPortfolio(stakedDPI),
    await getPortfolio(randomHoldings),
  ]);

  return {
    id: 'yam',
    name: 'Yam Finance',
    category: 'l1',
    treasury: totalValue + sushiTreasury + totalStakedDPI + totalRandomHoldings,
  };
}
