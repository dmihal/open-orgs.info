import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const treasuryAddress = '0x3dd46846eed8D147841AE162C8425c08BD8E1b41';

export async function getMstableData(): Promise<OrganizationData> {
  const treasuryBalance = await getPortfolio(treasuryAddress);

  return {
    id: 'mstable',
    name: 'mStable',
    category: 'l1',
    treasury: treasuryBalance,
  };
}
