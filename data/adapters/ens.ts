import { Context } from '@cryptostats/sdk'
import { getSnapshotProposals } from './snapshot'

const REGISTRAR = '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5' // Registrar controller (fee collection)
const GNOSIS = '0xCF60916b6CB4753f58533808fA610FcbD4098Ec0' // Gnosis safe
const TIMELOCK = '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7' // Timelock
const VESTING_ADDRESS = '0xd7A029Db2585553978190dB5E85eC724Aa4dF23f'

const TREASURY_ADDRESSES = GNOSIS + ',' + TIMELOCK

export async function setup(sdk: Context) {
  let portfolioCache: { [address: string]: Promise<any> } = {}
  const getPortfolio = (key: string): Promise<any> => {
    if (!portfolioCache[key]) {
      portfolioCache[key] = fetch(`https://zerion-api.vercel.app/api/portfolio/${key}`)
        .then(req => req.json())
        .then(result => {
          if (result.success) {
            return result.value
          }
          console.log(`https://zerion-api.vercel.app/api/portfolio/${key}`, result)
          throw new Error(result.error)
        })
    }
    return portfolioCache[key]
  }

  const getRegistrarETH = async () => {
    const balance = await sdk.ethers.getProvider('ethereum').getBalance(REGISTRAR)
    return parseFloat(sdk.ethers.utils.formatEther(balance))
  }

  const getTreasuryInUSD = async () => {
    const [treasury, vesting, eth] = await Promise.all([
      getPortfolio(TREASURY_ADDRESSES),
      getPortfolio(VESTING_ADDRESS),
      getRegistrarETH(),
    ])

    for (const item of treasury.portfolio) {
      if (item.symbol === 'ETH') {
        return treasury.totalValue + vesting.totalValue + (eth * item.price)
      }
    }
    throw new Error('No ETH')
  }

  const getLiquidTreasuryInUSD = async () => {
    const [treasury, eth] = await Promise.all([
      getPortfolio(TREASURY_ADDRESSES),
      getRegistrarETH(),
    ])

    for (const item of treasury.portfolio) {
      if (item.symbol === 'ETH') {
        return treasury.totalValue + (eth * item.price)
      }
    }
    throw new Error('No ETH')
  }

  const getTreasuryPortfolio = async () => {
    const [treasury, vesting, eth] = await Promise.all([
      getPortfolio(TREASURY_ADDRESSES),
      getPortfolio(VESTING_ADDRESS),
      getRegistrarETH(),
    ])

    const portfolio = [
      ...treasury.portfolio,
      ...vesting.portfolio.map((portfolioItem: any) => ({ ...portfolioItem, vesting: true })),
    ]

    for (const item of portfolio) {
      if (item.symbol === 'ETH') {
        item.amount += eth
        item.value += eth * item.price
        return portfolio
      }
    }
    throw new Error('No ETH')
  }

  sdk.register({
    id: 'ens',
    queries: {
      currentTreasuryUSD: getTreasuryInUSD,
      currentLiquidTreasuryUSD: getLiquidTreasuryInUSD,
      currentTreasuryPortfolio: getTreasuryPortfolio,
      recentProposals: () => getSnapshotProposals(sdk, 'ens.eth'),
    },
    metadata: {
      icon: sdk.ipfs.getDataURILoader('QmVmFQeYcLjeEm2fFhyyS762KytMQQhwdEXyGXAid1Rf8B', 'image/svg+xml'),
      name: 'ENS',
      website: 'https://ens.domains',
      treasuries: [REGISTRAR, GNOSIS, TIMELOCK, VESTING_ADDRESS],
    },
  })
}
