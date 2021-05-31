import { OrganizationData } from '../types'

export async function getDGTreasury() {
  const request = await fetch(
    `https://api.decentral.games/admin/getTreasuryBalanceHistory/week?`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  const json = await request.json()
  return json.totalBalanceUSD.graph.slice(-1)[0].secondary
}

export async function getDGData(): Promise<OrganizationData> {
  const treasuryValue = await getDGTreasury()

  return {
    id: 'dg',
    name: 'Decentral Games',
    category: 'l1',
    treasury: treasuryValue,
  };
}
