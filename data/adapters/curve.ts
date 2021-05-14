import { OrganizationData } from '../types'
import { getPortfolio } from '../utils/zerion'

const curveDAO = '0xe3997288987E6297Ad550A69B31439504F513267';
const grantsDAO = '0xc420C9d507D0E038BD76383AaADCAd576ed0073c';

export async function getCurveData(): Promise<OrganizationData> {
  const grantsDAOTreasury = await getPortfolio(grantsDAO)
  const curveDAOTreasury = await getPortfolio(curveDAO)

  return {
    id: 'curve',
    name: 'Curve',
    category: 'l1',
    treasury: grantsDAOTreasury + curveDAOTreasury,
  };
}
