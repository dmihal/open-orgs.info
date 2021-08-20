import { CryptoStatsSDK } from '@cryptostats/sdk'
import { Zerion } from './plugins/zerion'

if (!process.env.INFURA_KEY) {
  console.error('Infura key missing')
}

const sdk = new CryptoStatsSDK({
  infuraKey: process.env.INFURA_KEY,
  ipfsGateway: 'https://dweb.link',
})

sdk.plugins.addPlugin('zerion', new Zerion())

export default sdk
