export async function getEthplorerPortfolio(address: string) {
  const req = await fetch(`https://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`)
  const data = await req.json()

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
