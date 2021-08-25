import { Context } from '@cryptostats/sdk'

const ecosystemReserve = '0x25F2226B597E8F9514B3F68F00f494cF4f286491';
const revenueCollector = '0x464C71f6c2F760DdA6093dCB91C24c39e5d6e18c';

export async function setup(sdk: Context) {
  async function getEthplorerPortfolio(address: string) {
    const data = await sdk.http.get(`https://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`)

    let value = data.ETH.balance * data.ETH.price.rate

    const pricesBySymbol: { [symbol: string]: number } = {}

    for (const token of data.tokens) {
      if (token.tokenInfo.price) {
        value += (token.balance / (10 ** token.tokenInfo.decimals)) * token.tokenInfo.price.rate
        pricesBySymbol[token.tokenInfo.symbol] = token.tokenInfo.price.rate
      }
    }
    for (const token of data.tokens) {
      if (!token.tokenInfo.price && token.tokenInfo.name.indexOf('Aave interest bearing') === 0) {
        const underlyingSymbol = token.tokenInfo.name.substr(22)

        if (pricesBySymbol[underlyingSymbol]) {
          value += (token.balance / (10 ** token.tokenInfo.decimals)) * pricesBySymbol[underlyingSymbol]
        }
      }
    }
    return value
  }

  const getTreasuryInUSD = async () => {
    const ecosystemReserveTreasury = await sdk.plugins.getPlugin('zerion').getTotalValue(ecosystemReserve)

    // The revenue collector has too many txs to be supported by Zerion
    const revenueCollectorTreasury = await getEthplorerPortfolio(revenueCollector)

    return ecosystemReserveTreasury + revenueCollectorTreasury
  }

  sdk.register({
    id: 'aave',
    queries: {
      currentTreasuryUSD: getTreasuryInUSD,
      currentTreasuryPortfolio: async () => [],
    },
    metadata: {
      icon: sdk.ipfs.getDataURILoader('QmW4X8Q36jjPm8fzU21NzFKRxNzReQy4JnehKbRrgybFh6', 'image/svg+xml'),
      category: 'app',
      name: 'Aave',
      website: 'https://aave.com',
      governanceSite: 'https://app.aave.com/governance',
      governanceForum: 'https://governance.aave.com',
      governanceModel: '',
    },
  })
}
