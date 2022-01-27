import { CryptoStatsSDK } from '@cryptostats/sdk'

if (!process.env.MORALIS_KEY) {
  console.error('Moralis key missing')
}

const sdk = new CryptoStatsSDK({
  moralisKey: process.env.MORALIS_KEY,
  ipfsGateway: 'https://ipfs.cryptostats.community',
  adapterListSubgraph: 'dmihal/cryptostats-adapter-registry-test',
})

export default sdk
