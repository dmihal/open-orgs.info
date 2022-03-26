import { CryptoStatsSDK } from '@cryptostats/sdk'

// if (!process.env.MORALIS_KEY) {
//   console.error('Moralis key missing')
// }

const sdk = new CryptoStatsSDK({
  // moralisKey: process.env.MORALIS_KEY,
  executionTimeout: 60,
})

if (process.env.ALCHEMY_ETH_KEY) {
  const rpc = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_ETH_KEY}`
  sdk.ethers.addProvider('ethereum', rpc, { archive: true })
} else {
  console.error('Alchemy key not set')
}

export default sdk
