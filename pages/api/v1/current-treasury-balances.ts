import { NextApiRequest, NextApiResponse } from 'next';
import { getAaveData } from 'data/adapters/aave'
import { getAlchemixData } from 'data/adapters/alchemix'
import { getAPI3Data } from 'data/adapters/api3'
import { getBadgerData } from 'data/adapters/badger'
import { getBalancerData } from 'data/adapters/balancer'
import { getBarnBridgeData } from 'data/adapters/barnbridge'
import { getCompoundData } from 'data/adapters/compound'
import { getDGData } from 'data/adapters/decentralgames'
import { getDXDAOData } from 'data/adapters/dxdao'
import { getIndexData } from 'data/adapters/index'
import { getLinkswapData } from 'data/adapters/linkswap'
import { getMakerDAOData } from 'data/adapters/makerdao'
import { getNexusData } from 'data/adapters/nexus'
import { getSynthetixData } from 'data/adapters/synthetix'
import { getSushiData } from 'data/adapters/sushi'
import { getUniswapData } from 'data/adapters/uniswap'
import { getTornadoData } from 'data/adapters/tornado'
import { getYamData } from 'data/adapters/yam'
import { getYearnData } from 'data/adapters/yearn'

const sort = (a: any, b: any) => b.treasury - a.treasury

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const handleFailure = (e: any) => {
    console.warn(e);
    return null;
  };

  const data2 = await Promise.all([
    getAaveData().catch(handleFailure),
    getAlchemixData().catch(handleFailure),
    getAPI3Data().catch(handleFailure),
    getBadgerData().catch(handleFailure),
    getBalancerData().catch(handleFailure),
    getBarnBridgeData().catch(handleFailure),
    getCompoundData().catch(handleFailure),
    getDGData().catch(handleFailure),
    getDXDAOData().catch(handleFailure),
    getIndexData().catch(handleFailure),
    getLinkswapData().catch(handleFailure),
    getMakerDAOData().catch(handleFailure),
    getNexusData().catch(handleFailure),
    getSushiData().catch(handleFailure),
    getSynthetixData().catch(handleFailure),
    getTornadoData().catch(handleFailure),
    getUniswapData().catch(handleFailure),
    getYearnData().catch(handleFailure),
    getYamData().catch(handleFailure),
  ]);

  const data = data2.filter((val: any) => !!val).sort(sort);

  res.setHeader('Cache-Control', `max-age=0, s-maxage=${60 * 10}`);
  res.json({ success: true, data });
};

export default handler;
