import { IssuanceData } from './types'

export async function getCosmosData(): Promise<IssuanceData> {
  const req = await fetch("https://api.cosmostation.io/v1/staking/validators");
  const data = JSON.parse(await req.text())
    .filter((node: any) => node.status === 3);

  return {
    id: 'cosmos',
    name: 'Cosmos Hub',
    category: 'l1',
    sevenDayMA: data.length,
    oneDay: data.length,
  };
}
