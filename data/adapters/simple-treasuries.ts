import { Context } from '@cryptostats/sdk'

interface Org {
  id: string
  name: string
  icon?: string
  addresses: string[]
  iconType?: string
}

const orgs: Org[] = [
  {
    id: 'alchemix',
    name: 'Alchemix',
    addresses: ['0x8392f6669292fa56123f71949b52d883ae57e225'],
    icon: 'QmSuSUcAvGkxkJ7n5RxnDyqXUchAjXMwTmNioz2xzXVfxo',
    iconType: 'image/jpeg',
  },
  {
    id: 'api3',
    name: 'API3',
    addresses: ['0xe7aF7c5982e073aC6525a34821fe1B3e8E432099'],
    icon: 'QmVp2hVgfD8sQRFosydPsNAVmttno5tRhun44YiXagNeGX',
    iconType: 'image/jpeg',
  },
  {
    id: 'badger',
    name: 'Badger',
    addresses: ['0x4441776e6a5d61fa024a5117bfc26b953ad1f425'],
    icon: 'QmSraKiNmctuShFEqgGmLVamKuwZC6TFs26R27959ugExn',
    iconType: 'image/png',
  },
  {
    id: 'balancer',
    name: 'Balancer',
    addresses: [
      '0xb618F903ad1d00d6F7b92f5b0954DcdC056fC533', // ecosystem fund
      '0xce88686553686DA562CE7Cea497CE749DA109f9F', // protocol fee collector
    ],
    icon: 'Qma9agewDVEhZjnLrY2aWy3ZHvYmUtZ5uXM3tCHZu5eDM2',
  },
  {
    id: 'barnbridge',
    name: 'BarnBridge',
    addresses: ['0x4cAE362D7F227e3d306f70ce4878E245563F3069'],
    icon: 'QmWD4Eg6AdYmyAb9aSfELP7L4cU2uTFYoejHVsWjerYWZo',
  },
  {
    id: 'compound',
    name: 'Compound',
    addresses: [
      '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b', // treasury
      '0x2775b1c75658Be0F640272CCb8c72ac986009e38', // resevoir
    ],
    icon: 'QmZpZsg829EnBxE2MPZykZpAfsxyRsu6EuGbtfTkf2EFNj',
  },
  {
    id: 'dxdao',
    name: 'DXdao',
    addresses: [
      '0x519b70055af55a007110b4ff99b0ea33071c720a', // treasury
      '0xa1d65e8fb6e87b60feccbc582f7f97804b725521' // bonding curve
    ],
    icon: 'QmVvZF3qMp8fx9dpYvkCMV849U6oLaKJJA5BxxUCmabvb4',
  },
  {
    id: 'index-coop',
    name: 'Index Coop',
    addresses: ['0x9467cfADC9DE245010dF95Ec6a585A506A8ad5FC'],
    icon: 'QmRU38pAray7rYt4irRswPAK6E6nxiTiXZ1bAp8fr3CcW2',
    iconType: 'image/png',
  },
  {
    id: 'linkswap',
    name: 'Linkswap',
    addresses: ['0xE69A81b96FBF5Cb6CAe95d2cE5323Eff2bA0EAE4'],
    icon: 'QmdAhG1qWuW6wEcuW29ZjAvqPz8grSYHsR7HZJLSkqkGQ5',
  },
  {
    id: 'mstable',
    name: 'mStable',
    addresses: ['0x3dd46846eed8D147841AE162C8425c08BD8E1b41'],
    icon: 'QmTkxsvMnSPb7A2bPUxA4uJRwJefkyzFgGar5NVxV5UJjr',
  },
  {
    id: 'nexus',
    name: 'Nexus Mutual',
    addresses: ['0x586b9b2F8010b284A0197f392156f1A7Eb5e86e9'],
    icon: 'QmNQZE9r6NMANc57fA6uXtjC817nVbdgSVCcviG9cHkffB',
  },
  {
    id: 'sushi',
    name: 'SushiSwap',
    addresses: ['0xe94b5eec1fa96ceecbd33ef5baa8d00e4493f4f3'],
    icon: 'QmVAko4auvE2NDr8kfnovVqTqujrJ69YrUZQFPZeREMWk5',
  },
  {
    id: 'synthetix',
    name: 'Synthetix',
    addresses: [
      '0xEb3107117FEAd7de89Cd14D463D340A2E6917769', // synthetix DAO
      '0x86626E1BbBd0ce95ED52e0C5E19f371a6640B591', // grants DAO
    ],
    icon: 'QmbhNC22taFj3jq4CJSHLvTSqWNyBXFSzKAepsvVN6tPhe',
  },
  {
    id: 'tornado',
    name: 'Tornado Cash',
    addresses: [
      '0x5efda50f22d34F262c29268506C5Fa42cB56A1Ce', // governance
      '0x179f48C78f57A3A78f0608cC9197B8972921d1D2', // vesting
    ],
    icon: 'QmeUzPPCdpqEYArWyMdUVZJk4GUmuR4TAkK6U4eb9vZDPa',
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    addresses: [
      '0x1a9c8182c09f50c8318d769245bea52c32be35bc', // treasury
      // vesting:
      '0x4750c43867ef5f89869132eccf19b9b6c4286e1a',
      '0xe3953d9d317b834592ab58ab2c7a6ad22b54075d',
      '0x4b4e140d1f131fdad6fb59c13af796fd194e4135',
      '0x3d30b1ab88d487b0f3061f40de76845bec3f1e94',
    ],
    icon: 'QmPXoiG66a9gCDX1NX51crWV7UAijoFd5wycHrfRKM6Y1n',
  },
  {
    id: 'yam',
    name: 'Yam Finance',
    addresses: [
      '0x97990B693835da58A281636296D2Bf02787DEa17', // treasury
      '0xd67c05523d8ec1c60760fd017ef006b9f6e496d0', // sushiTreasury
      '0x205cc7463267861002b27021c7108bc230603d0f', // stakedDPI
      '0xd67c05523d8ec1c60760fd017ef006b9f6e496d0', // randomHoldings
    ],
    icon: 'QmcPjtA1Q9QhnAeruXkrsYU3HZ5b8sm3eU78VUjHDXhior',
    iconType: 'image/png',
  },
  {
    id: 'yearn',
    name: 'Yearn',
    addresses: ['0xfeb4acf3df3cdea7399794d0869ef76a6efaff52' /*  ychad.eth */],
    icon: 'QmYGdvDA6jM5AV1yBvQKUAz74wqGeBUwVohBWEgbwqXpjk',
  },
]

export async function setup(sdk: Context) {
  const addrToPortfolio = (addr: string) => sdk.plugins.getPlugin('zerion').getPortfolio(addr)

  const createTreasuryLoader = (addresses: string[]) => async () => {
    const balances = await Promise.all(addresses.map(addrToPortfolio))
    const totalTreasury = balances.reduce((a: number, b: number) => a + b, 0)
    return totalTreasury
  }

  for (const org of orgs) {
    sdk.register({
      id: org.id,
      queries: {
        currentTreasuryUSD: createTreasuryLoader(org.addresses),
      },
      metadata: {
        icon: org.icon ? sdk.ipfs.getDataURILoader(org.icon, org.iconType || 'image/svg+xml') : 0,
        category: 'app',
        name: org.name,
        treasuries: org.addresses,
      },
    })
  }
}
