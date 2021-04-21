import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const land = '0x7146cae915f1cd90871ecc69999beffdcaf38ff9';
const treasury = '0x7a61a0ed364e599ae4748d1ebe74bf236dd27b09';

export async function getDGData(): Promise<OrganizationData> {
  const treasuryValue = await getPortfolio(treasury)
  const landValue = await getPortfolio(land)

  return {
    id: 'dg',
    name: 'Decentral Games',
    category: 'l1',
    treasury: treasuryValue + landValue,
  };
}
