import { IssuanceData } from './types'

export async function getCardanoData(): Promise<IssuanceData> {
  const req = await fetch("https://gql2.pooltool.io/v1/graphql", {
    "headers": {
      "content-type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify({
      operationName: "PoolsQueryAll",
      "variables": {},
      "query": `query PoolsQueryAll {
        pools(where: {livestake: {_gt: 0} }) {
            ...Pool
            __typename
            }
          }

          fragment Pool on pools {
            pool_md_name
            livestake
          }`
        }),
  });
  const { data } = await req.json();
  console.log(data);

  return {
    id: 'ADA',
    name: 'Cardano',
    category: 'l1',
    sevenDayMA: data.pools.length,
    oneDay: data.pools.length,
  };
}
