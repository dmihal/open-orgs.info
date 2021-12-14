import { CryptoStatsSDK } from '@cryptostats/sdk'

if (!process.env.INFURA_KEY) {
  console.error('Infura key missing')
}

const sdk = new CryptoStatsSDK({
  infuraKey: process.env.INFURA_KEY,
  ipfsGateway: 'https://ipfs.cryptostats.community',
  adapterListSubgraph: 'dmihal/cryptostats-adapter-registry-test',
})

export default sdk
