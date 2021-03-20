import { IssuanceData } from './types'

export async function getCardanoData(): Promise<IssuanceData> {
  const req = await fetch("https://s3-us-west-2.amazonaws.com/data.pooltool.io/Mainnet/stake_pool_columns/254/stake.json");
  const data = await req.json();

  const numPools = Object.entries(data).filter((pool: any) => pool[1] > 0).length;

  return {
    id: 'ada',
    name: 'Cardano',
    category: 'l1',
    sevenDayMA: numPools,
    oneDay: numPools,
  };
}
