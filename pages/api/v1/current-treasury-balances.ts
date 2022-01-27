import { NextApiRequest, NextApiResponse } from 'next';
import sdk from 'data/sdk'

// const sort = (a: any, b: any) => b.treasury - a.treasury

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const list = sdk.getList('treasuries')

  const data = await list.executeQueriesWithMetadata(['currentTreasuryUSD'])

  res.setHeader('Cache-Control', `max-age=0, s-maxage=${60 * 10}`);
  res.json({ success: true, data });
};

export default handler;
