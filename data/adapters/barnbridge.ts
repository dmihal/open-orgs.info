import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const treasury = '0x4cAE362D7F227e3d306f70ce4878E245563F3069';

export async function getBarnBridgeData(): Promise<OrganizationData> {
  const treasuryValue = await getPortfolio(treasury)

  return {
    id: 'barnbridge',
    name: 'BarnBridge',
    category: 'l1',
    treasury: treasuryValue,
  };
}
