import { IssuanceData } from './types'

export async function getTezosData(): Promise<IssuanceData> {
  const req = await fetch("https://api.tzstats.com/explorer/tip");
  const data = await req.json()

  return {
    id: 'xtz',
    name: 'Tezos',
    category: 'l1',
    sevenDayMA: data.roll_owners,
    oneDay: data.roll_owners,
  };
}
