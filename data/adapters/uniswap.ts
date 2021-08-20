import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const treasury = '0x1a9c8182c09f50c8318d769245bea52c32be35bc';

const vestingTreasury = [
  '0x4750c43867ef5f89869132eccf19b9b6c4286e1a',
  '0xe3953d9d317b834592ab58ab2c7a6ad22b54075d',
  '0x4b4e140d1f131fdad6fb59c13af796fd194e4135',
  '0x3d30b1ab88d487b0f3061f40de76845bec3f1e94',
];

export async function getUniswapData(): Promise<OrganizationData> {
  const balances = await Promise.all([treasury, ...vestingTreasury].map(address => getPortfolio(address)));
  const totalTreasury = balances.reduce((a: number, b: number) => a + b, 0);

  return {
    id: 'uniswap',
    name: 'Uniswap',
    category: 'l1',
    treasury: totalTreasury,
  };
}
