import { IssuanceData } from './types'

export async function getPolkadotData(): Promise<IssuanceData> {
  let numValidators = 0
  let page = 1

  while(true) {
    const req = await fetch(`https://explorer-31.polkascan.io/api/v1/polkadot/account?filter[is_validator]=1&page[number]=${page}&page[size]=100`, {
      "headers": {
        "content-type": "application/json",
      },
    });
    const { data } = await req.json();
    numValidators += data.length
    page += 1
    if (data.length != 100) {
      break
    }
  }

  return {
    id: 'polkadot',
    name: 'Polkadot',
    category: 'l1',
    sevenDayMA: numValidators,
    oneDay: numValidators,
  };
}
