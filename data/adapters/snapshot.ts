import { Context } from '@cryptostats/sdk'

export async function getSnapshotProposals (sdk: Context, id: string) {
  const response = await sdk.http.post('https://hub.snapshot.org/graphql', {
    query: `query Proposals($space: String!) {
      proposals (
        first: 5,
        skip: 0,
        where: { space_in: [$space] },
        orderBy: "created",
        orderDirection: desc
      ) {
        id
        title
        start
        end
        state
        link
      }
    }`,
    variables: { space: id },
  })

  return response.data.proposals
}
