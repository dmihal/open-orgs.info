import { CryptoStatsSDK } from '@cryptostats/sdk'

if (!process.env.INFURA_KEY) {
  console.error('Infura key missing')
}

const sdk = new CryptoStatsSDK({
  infuraKey: process.env.INFURA_KEY,
  ipfsGateway: 'https://ipfs.cryptostats.community',
})

export default sdk
