import { OrganizationData } from '../types'
import { TOKENS, getTokenBalance } from '../utils/tokens'

const vestedContract = '0x1a9c8182c09f50c8318d769245bea52c32be35bc';
const unvestedContract = '0x4750c43867ef5f89869132eccf19b9b6c4286e1a';

export async function getUniswapData(): Promise<OrganizationData> {
  const vestedBalance = await getTokenBalance(TOKENS.UNI, vestedContract);
  const unvestedBalance = await getTokenBalance(TOKENS.UNI, unvestedContract);

  return {
    id: 'uniswap',
    name: 'Uniswap',
    category: 'l1',
    treasury: (vestedBalance + unvestedBalance) * 30,
  };
}
