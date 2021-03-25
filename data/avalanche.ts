import { IssuanceData } from './types'

export async function getAvalancheData(): Promise<IssuanceData> {
  const req = await fetch("https://www.stakingrewards.com/_next/data/9no-Pf-IpoACpldFti6Nk/en/earn/avalanche/metrics.json?tab=metrics&slug=avalanche");
  const { pageProps } = await req.json();

  const stats: any = {};
  pageProps.assetData.asset.networkStats.forEach((stat: any) => {
    stats[stat.key] = stat.value;
  });

  if (!stats.active_validators) {
    throw new Error('active_validators not found for avalanche');
  }

  return {
    id: 'avalanche',
    name: 'Avalanche',
    category: 'l1',
    sevenDayMA: stats.active_validators,
    oneDay: stats.active_validators,
  };
}
