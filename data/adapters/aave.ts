import { Context } from '@cryptostats/sdk'

const ECOSYSTEM_RESERVE = '0x25F2226B597E8F9514B3F68F00f494cF4f286491';
const revenueCollector = '0x464C71f6c2F760DdA6093dCB91C24c39e5d6e18c';

interface PortfolioAsset {
  address: string
  amount: number
  name: string
  symbol: string
  icon: string
  price: number
  value: number
}

export async function setup(sdk: Context) {
  let treasuryPortfolioPromise: Promise<any> | null
  const getEcosystemReservePortfolio = (): Promise<any> => {
    if (!treasuryPortfolioPromise) {
      treasuryPortfolioPromise = fetch(`https://zerion-api.vercel.app/api/portfolio/${ECOSYSTEM_RESERVE}`)
        .then(req => req.json())
        .then(result => {
          if (result.success) {
            return result.value
          }
          throw new Error(result.message)
        })
    }
    return treasuryPortfolioPromise
  }

  const cache: { [address: string]: Promise<any> } = {}

  function getEthplorerPortfolio(address: string) {
    if (!cache[address]) {
      cache[address] = getEthplorerPortfolioInternal(address)
    }
    return cache[address]
  }

  async function getEthplorerPortfolioInternal(address: string) {
    const data = await sdk.http.get(`https://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`)

    let totalValue = data.ETH.balance * data.ETH.price.rate

    const pricesBySymbol: { [symbol: string]: number } = {}
    const portfolio: PortfolioAsset[] = []

    for (const token of data.tokens) {
      if (token.tokenInfo.price) {
        const amount = token.balance / (10 ** token.tokenInfo.decimals)
        const value = amount * token.tokenInfo.price.rate
        totalValue += value
        pricesBySymbol[token.tokenInfo.symbol] = token.tokenInfo.price.rate

        portfolio.push({
          address: token.tokenInfo.address,
          amount,
          value,
          price: token.tokenInfo.price.rate,
          name: token.tokenInfo.name,
          symbol: token.tokenInfo.symbol,
          icon: `https://s3.amazonaws.com/token-icons/${token.tokenInfo.address}.png`,
        })
      }
    }
    for (const token of data.tokens) {
      if (!token.tokenInfo.price && token.tokenInfo.name.indexOf('Aave interest bearing') === 0) {
        const underlyingSymbol = token.tokenInfo.name.substr(22)

        if (pricesBySymbol[underlyingSymbol]) {
          const amount = token.balance / (10 ** token.tokenInfo.decimals)
          const value = amount * pricesBySymbol[underlyingSymbol]
          totalValue += value

          portfolio.push({
            address: token.tokenInfo.address,
            amount,
            value,
            price: pricesBySymbol[underlyingSymbol],
            name: token.tokenInfo.name,
            symbol: token.tokenInfo.symbol,
            icon: `https://s3.amazonaws.com/token-icons/${token.tokenInfo.address}.png`,
          })
        }
      }
    }
    return { totalValue, portfolio }
  }

  const getTreasuryInUSD = async () => {
    const ecosystemReserve = await getEcosystemReservePortfolio()

    // The revenue collector has too many txs to be supported by Zerion
    const { totalValue: revenueCollectorTreasury } = await getEthplorerPortfolio(revenueCollector)

    return ecosystemReserve.totalValue + revenueCollectorTreasury
  }

  const getPortfolio = async () => {
    const [{ portfolio: reservePortfolio }, { portfolio: collectorPortfolio }] = await Promise.all([
      getEcosystemReservePortfolio(),
      getEthplorerPortfolio(revenueCollector),
    ])
    return [...reservePortfolio, ...collectorPortfolio]
  }

  const getRecentProposals = async () => {
    const query = `{
      proposals(
        first: 5,
        orderBy: createdTimestamp,
        orderDirection: desc
      ) {
        title
        id
        ipfsHash
        createdTimestamp
        state
      }
    }`
    const data = await sdk.graph.query('aave/governance-v2', query);
    return data.proposals.map((proposal: any) => ({
      title: proposal.title,
      start: proposal.createdTimestamp,
      state: proposal.state,
      link: `https://app.aave.com/governance/${proposal.id}-${proposal.ipfsHash}`,
    }))
  }

  sdk.register({
    id: 'aave',
    queries: {
      currentTreasuryUSD: getTreasuryInUSD,
      currentLiquidTreasuryUSD: getTreasuryInUSD,
      currentTreasuryPortfolio: getPortfolio,
      recentProposals: getRecentProposals,
    },
    metadata: {
      icon: sdk.ipfs.getDataURILoader('QmW4X8Q36jjPm8fzU21NzFKRxNzReQy4JnehKbRrgybFh6', 'image/svg+xml'),
      category: 'app',
      name: 'Aave',
      website: 'https://aave.com',
      governanceSite: 'https://app.aave.com/governance',
      governanceForum: 'https://governance.aave.com',
      governanceModel: '',
      treasuries: [ECOSYSTEM_RESERVE, revenueCollector],
    },
  })
}
