import { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import ReactDOMServer from 'react-dom/server'
import React from 'react'
import path from 'path'
import SocialCard from 'components/SocialCard'
import sdk from 'data/sdk'

// These statements causes Next to bundle these files
path.resolve(process.cwd(), 'fonts', 'fonts.conf')
path.resolve(process.cwd(), 'fonts', 'SofiaProRegular.ttf')

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const list = sdk.getList('treasuries')
  const data = await list.executeQueriesWithMetadata(['currentTreasuryUSD'], {
    allowMissingQuery: true,
  })

  const filteredData = data.filter((val: any) => !!val)

  const svg = ReactDOMServer.renderToString(
    React.createElement(SocialCard, {
      data: filteredData,
    })
  )

  const buffer = Buffer.from(svg)
  const output = await sharp(buffer, { density: 300 }).toFormat('png').toBuffer()

  res.setHeader('Cache-Control', 'max-age=0, s-maxage=240')
  res.setHeader('Content-Type', 'image/png')
  res.end(output, 'binary')
};

export default handler
