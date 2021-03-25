import { IssuanceData } from './types'

export async function getSolanaData(): Promise<IssuanceData> {
  const req = await fetch("https://www.stakingrewards.com/_next/data/9no-Pf-IpoACpldFti6Nk/en/earn/solana/metrics.json?tab=metrics&slug=solana");
  const { pageProps } = await req.json();

  const stats: any = {};
  pageProps.assetData.asset.networkStats.forEach((stat: any) => {
    stats[stat.key] = stat.value;
  });

  if (!stats.active_validators) {
    throw new Error('active_validators not found for solana');
  }

  return {
    id: 'solana',
    name: 'Solana',
    category: 'l1',
    sevenDayMA: stats.active_validators,
    oneDay: stats.active_validators,
  };
}
