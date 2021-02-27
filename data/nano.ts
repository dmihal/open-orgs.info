import { IssuanceData } from './types'

export async function getNanoData(): Promise<IssuanceData> {
  const req = await fetch("https://mynano.ninja/api/accounts/principals");
  const data = await req.json()

  return {
    id: 'nano',
    name: 'Nano',
    category: 'l1',
    sevenDayMA: data.length,
    oneDay: data.length,
  };
}
