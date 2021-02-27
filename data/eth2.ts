import { IssuanceData } from './types'

export async function getEth2Data(): Promise<IssuanceData> {
  const req = await fetch("https://beaconcha.in/api/v1/epoch/latest", {
    "headers": {
      "content-type": "application/json",
    },
  });
  const { data } = await req.json();

  return {
    id: 'eth',
    name: 'Ethereum 2.0',
    category: 'l1',
    sevenDayMA: data.validatorscount,
    oneDay: data.validatorscount,
  };
}
