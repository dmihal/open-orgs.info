import { Context } from '@cryptostats/sdk'
import { getSnapshotProposals } from './snapshot'

interface Org {
  id: string
  icon?: string
  addresses: string[]
  vestingAddresses?: string[]
  nativeTokens?: string[]
  iconType?: string
  snapshotId?: string
  governanceSite?: string
  metadata: any
  getProposals?: (sdk: Context) => Promise<any>
}

const orgs: Org[] = [
  {
    id: 'alchemix',
    addresses: ['0x8392f6669292fa56123f71949b52d883ae57e225'],
    icon: 'QmSuSUcAvGkxkJ7n5RxnDyqXUchAjXMwTmNioz2xzXVfxo',
    iconType: 'image/jpeg',
    snapshotId: 'alchemixstakers.eth',
    metadata: {
      name: 'Alchemix',
      website: 'https://alchemix.fi/',
      governanceSite: 'https://snapshot.page/#/alchemixstakers.eth',
      governanceForum: 'https://forum.alchemix.fi',
      governanceModel: '',
    },
  },
  {
    id: 'api3',
    addresses: ['0xe7aF7c5982e073aC6525a34821fe1B3e8E432099'],
    icon: 'QmVp2hVgfD8sQRFosydPsNAVmttno5tRhun44YiXagNeGX',
    iconType: 'image/jpeg',
    metadata: {
      name: 'API3',
      website: 'https://api3.org',
      governanceSite: 'https://api3.eth.link/#/governance',
      governanceModel: '',
    },
  },
  {
    id: 'badger',
    addresses: [
      '0x4441776e6a5d61fa024a5117bfc26b953ad1f425',
      '0x5a54ca44e8f5a1a695f8621f15bfa159a140bb61',
      '0x8de82c4c968663a0284b01069dde6ef231d0ef9b',
      '0xb65cef03b9b89f99517643226d76e286ee999e77',
    ],
    icon: 'QmSraKiNmctuShFEqgGmLVamKuwZC6TFs26R27959ugExn',
    iconType: 'image/png',
    snapshotId: 'badgerdao.eth',
    metadata: {
      name: 'Badger',
      description: 'Badger DAO is dedicated to building products and infrastructure to bring Bitcoin to DeFi.',
      website: 'https://badger.finance',
      governanceForum: 'https://forum.badger.finance',
      governanceModel: '',
    },
  },
  {
    id: 'balancer',
    addresses: [
      '0x10A19e7eE7d7F8a52822f6817de8ea18204F2e4f', // ecosystem fund
      '0xce88686553686DA562CE7Cea497CE749DA109f9F', // protocol fee collector
    ],
    icon: 'Qma9agewDVEhZjnLrY2aWy3ZHvYmUtZ5uXM3tCHZu5eDM2',
    metadata: {
      name: 'Balancer',
      website: 'https://balancer.finance',
      governanceSite: 'https://vote.balancer.finance',
      governanceForum: 'https://forum.balancer.fi/',
      governanceModel: '',
    },
  },
  {
    id: 'barnbridge',
    addresses: ['0x4cAE362D7F227e3d306f70ce4878E245563F3069'],
    icon: 'QmWD4Eg6AdYmyAb9aSfELP7L4cU2uTFYoejHVsWjerYWZo',
    metadata: {
      name: 'BarnBridge',
      website: 'https://barnbridge.com/',
      governanceSite: 'https://app.barnbridge.com/governance',
      governanceForum: 'https://forum.barnbridge.com/',
      governanceModel: '',
    },
  },
  {
    id: 'compound',
    addresses: ['0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b'],
    vestingAddresses: ['0x2775b1c75658Be0F640272CCb8c72ac986009e38'],
    icon: 'QmZpZsg829EnBxE2MPZykZpAfsxyRsu6EuGbtfTkf2EFNj',
    metadata: {
      name: 'Compound',
      website: 'https://compound.finance',
      governanceSite: 'https://compound.finance/governance',
      governanceForum: 'https://www.comp.xyz',
      governanceModel: '',
    },
  },
  {
    id: 'gitcoin',
    addresses: [
      '0x57a8865cfB1eCEf7253c27da6B4BC3dAEE5Be518', // Treasury
      '0xde21F729137C5Af1b01d73aF1dC21eFfa2B8a0d6', // Grants
    ],
    vestingAddresses: ['0x44aa9c5a034c1499ec27906e2d427b704b567ffe'],
    icon: 'QmR8nFrnSu7Mby5tdPPdUrTZttaK7L3TVsZheuwZ1KPUCT',
    snapshotId: 'gitcoindao.eth',
    metadata: {
      name: 'Gitcoin',
      website: 'https://gitcoin.co',
      governanceForum: 'https://gov.gitcoin.co',
    },
  },
  {
    id: 'fei',
    addresses: [
      '0x8d5ed43dca8c2f7dfb20cf7b53cc7e593635d7b9', // Core
      '0xd51dba7a94e1adea403553a8235c302cebf41a3c', // Timelock
    ],
    icon: 'QmaeWtW4HDNCKRMTrtE3kabu2xQDtb5iaZduEEm68F7rqR',
    snapshotId: 'fei.eth',
    metadata: {
      name: 'Fei',
      website: 'https://fei.money',
      governanceForum: 'https://tribe.fei.money',
    },
  },
  {
    id: 'index-coop',
    addresses: ['0x9467cfADC9DE245010dF95Ec6a585A506A8ad5FC'],
    icon: 'QmcatsG9WgkB6m9vSF3mbgwXFJyG8qSDNsZyi2mEGRk4oa',
    snapshotId: 'index-coop.eth',
    metadata: {
      name: 'Index Coop',
      website: 'https://indexcoop.com',
      governanceForum: 'https://gov.indexcoop.com',
      governanceModel: '',
    },
  },
  {
    id: 'keeper',
    addresses: ['0x9a67f1940164d0318612b497e8e6038f902a00a4'],
    nativeTokens: ['0xfa5047c9c78b8877af97bdcb85db743fd7313d4a'],
    icon: 'QmQ8Fxi73dFhyYb5LncV7133q4XBwXNvR1hK9aW6aHaQWQ',
    snapshotId: 'rook.eth',
    metadata: {
      name: 'KeeperDAO',
      website: 'https://keeperdao.com',
      governanceForum: 'https://forum.keeperdao.com',
    },
  },
  {
    id: 'lao',
    addresses: ['0x8f56682a50becb1df2fb8136954f2062871bc7fc'],
    icon: 'QmcBBSvXC4nUQHSRy5BcGvX7RGWyhzeUifyHNR3e4q26T2',
    iconType: 'image/jpeg',
    metadata: {
      name: 'The LAO',
      website: 'https://linkswap.app',
      governanceSite: 'https://app.daohaus.club/dao/0x1/0x8f56682a50becb1df2fb8136954f2062871bc7fc',
    },
  },
  {
    id: 'lido',
    addresses: ['0x3e40d73eb977dc6a537af587d48316fee66e9c8c'],
    icon: 'QmcsGcopqrVyzTLXETtecJuhqxqxbzUvuFMqBd27yFKCMt',
    metadata: {
      name: 'Lido',
      website: 'https://lido.fi',
      governanceForum: 'https://research.lido.fi',
      governanceSite: 'https://mainnet.lido.fi/#/lido-dao.aragonid.eth',
    },
  },
  {
    id: 'linkswap',
    addresses: ['0xE69A81b96FBF5Cb6CAe95d2cE5323Eff2bA0EAE4'],
    icon: 'QmdAhG1qWuW6wEcuW29ZjAvqPz8grSYHsR7HZJLSkqkGQ5',
    snapshotId: 'yflink.eth',
    metadata: {
      name: 'Linkswap',
      website: 'https://linkswap.app',
      governanceModel: '',
    },
  },
  {
    id: 'metacartel-ventures',
    addresses: ['0x4570b4faf71e23942b8b9f934b47ccedf7540162'],
    icon: 'QmRfpPMV471hsVE4Zz6dTxoAyoNmc2UZPjDr6X8o34QAZz',
    iconType: 'image/jpeg',
    metadata: {
      name: 'MetaCartel Ventures',
      website: 'https://metacartel.xyz',
      governanceSite: 'https://app.daohaus.club/dao/0x1/0x4570b4faf71e23942b8b9f934b47ccedf7540162',
    },
  },
  {
    id: 'mstable',
    addresses: [
      '0x3dd46846eed8D147841AE162C8425c08BD8E1b41',
      '0xfcf455d6eb48b3289a712c0b3bc3c7ee0b0ee4c6', // Funding subDAO
      '0x67905d3e4fec0c85dce68195f66dc8eb32f59179', // Asset Management subDAO
    ],
    icon: 'QmTkxsvMnSPb7A2bPUxA4uJRwJefkyzFgGar5NVxV5UJjr',
    metadata: {
      name: 'mStable',
      website: 'https://mstable.org',
      governanceSite: 'https://snapshot.page/#/mstable',
      governanceForum: 'https://forum.mstable.org',
      governanceModel: '',
    },
  },
  {
    id: 'nexus',
    addresses: ['0x586b9b2F8010b284A0197f392156f1A7Eb5e86e9'],
    icon: 'QmWA5VaHWMH96mLmoaLKaxKVf86GLUJQVBp6BfaUoLH81g',
    metadata: {
      name: 'Nexus Mutual',
      website: 'https://nexusmutual.io/',
      governanceSite: 'https://app.nexusmutual.io/governance',
      governanceForum: 'https://forum.nexusmutual.io/',
      governanceModel: '',
    },
  },
  {
    id: 'nouns',
    addresses: ['0x0BC3807Ec262cB779b38D65b38158acC3bfedE10'],
    icon: 'QmXCYbSzPAWTUiNuHaFt6AxRkwhq9ho1cDfJ2Vc1Yeb4Js',
    metadata: {
      name: 'Nouns DAO',
      website: 'https://nouns.wtf',
      governanceSite: 'https://nouns.wtf/vote',
      governanceForum: 'https://discourse.nouns.wtf',
    },
  },
  {
    id: 'olympus',
    addresses: [
      '0x31F8Cc382c9898b273eff4e0b7626a6987C846E8', // Olympus Treasury
      '0x3df5a355457db3a4b5c744b8623a7721bf56df78', // Convex Allocator
      '0x0316508a1b5abf1CAe42912Dc2C8B9774b682fFC', // Onsen Allocator
      '0x0e1177e47151Be72e5992E0975000E73Ab5fd9D4', // Aave Allocator
    ],
    icon: 'QmbtqUKno2FATf4RFPXAvWCamYrRT6UAKurKiNCuMCJw1J',
    snapshotId: 'olympusdao.eth',
    metadata: {
      name: 'Olympus DAO',
      website: 'https://olympusdao.finance',
    },
  },
  {
    id: 'piedao',
    addresses: ['0x3bcf3db69897125aa61496fc8a8b55a5e3f245d5'],
    icon: 'QmahuQPfbqJEE9tXZKfubWPviy5wxesdfBbdUXhf8JRcN4',
    snapshotId: 'piedao',
    metadata: {
      name: 'PieDAO',
      website: 'https://piedao.org',
      governanceForum: 'https://forum.piedao.org/',
    },
  },
  {
    id: 'shapeshift',
    addresses: ['0x90A48D5CF7343B08dA12E067680B4C6dbfE551Be'],
    nativeTokens: ['0xc770EEfAd204B5180dF6a14Ee197D99d808ee52d'],
    icon: 'QmWTua7CSYcgb1YZCZZFQ2CvHxJxFyTK3SC1V86czCBTjL',
    snapshotId: 'shapeshiftdao.eth',
    metadata: {
      name: 'ShapeShift',
      website: 'https://shapeshift.com',
      governanceForum: 'https://forum.shapeshift.com',
    },
  },
  {
    id: 'sushi',
    addresses: ['0xe94b5eec1fa96ceecbd33ef5baa8d00e4493f4f3'],
    icon: 'QmVAko4auvE2NDr8kfnovVqTqujrJ69YrUZQFPZeREMWk5',
    snapshotId: 'sushigov.eth',
    metadata: {
      name: 'SushiSwap',
      website: 'https://sushi.com',
      governanceForum: 'https://forum.sushi.com/',
      governanceModel: '',
    },
  },
  {
    id: 'synthetix',
    addresses: [
      '0xEb3107117FEAd7de89Cd14D463D340A2E6917769', // synthetix DAO
      '0x86626E1BbBd0ce95ED52e0C5E19f371a6640B591', // grants DAO
      '0x99f4176ee457afedffcb1839c7ab7a030a5e4a92', // treasury council
    ],
    icon: 'QmYPqFXTqYcynD5hT9sZbsoPZXbvjSfL7WWQPL7EwYAyE5',
    metadata: {
      name: 'Synthetix',
      website: 'https://synthetix.io',
      governanceSite: 'https://staking.synthetix.io/gov',
      governanceForum: 'https://research.synthetix.io',
      governanceModel: '',
    },
  },
  {
    id: 'tornado',
    addresses: ['0x5efda50f22d34F262c29268506C5Fa42cB56A1Ce'],
    vestingAddresses: ['0x179f48C78f57A3A78f0608cC9197B8972921d1D2'],
    icon: 'QmeUzPPCdpqEYArWyMdUVZJk4GUmuR4TAkK6U4eb9vZDPa',
    metadata: {
      name: 'Tornado Cash',
      website: 'https://tornado.cash',
      governanceSite: 'https://app.tornado.cash/governance',
      governanceForum: 'https://torn.community',
      governanceModel: '',
    },
  },
  {
    id: 'uniswap',
    addresses: [
      '0x1a9c8182c09f50c8318d769245bea52c32be35bc', // treasury
    ],
    vestingAddresses: [
      '0x4750c43867ef5f89869132eccf19b9b6c4286e1a',
      '0xe3953d9d317b834592ab58ab2c7a6ad22b54075d',
      '0x4b4e140d1f131fdad6fb59c13af796fd194e4135',
      '0x3d30b1ab88d487b0f3061f40de76845bec3f1e94',
    ],
    icon: 'QmPXoiG66a9gCDX1NX51crWV7UAijoFd5wycHrfRKM6Y1n',
    metadata: {
      name: 'Uniswap',
      website: 'https://uniswap.org',
      governanceSite: 'https://app.uniswap.org/#/vote',
      governanceForum: 'https://gov.uniswap.org',
      governanceModel: '',
    },
    getProposals: async (sdk: Context) => {
      const query = `{
        proposals(
          first: 5,
          orderBy: creationTime,
          orderDirection: desc
        ) {
          id
          description
          creationTime
          status
        }
      }`
      const { proposals } = await sdk.graph.query('arr00/uniswap-governance-v3', query);
      return proposals.map((proposal: any) => ({
        title: proposal.description.split(/\n|  /)[0],
        start: proposal.creationTime,
        state: proposal.status,
        link: `https://app.uniswap.org/#/vote/${proposal.id.replace('.', '/')}`,
      }))
    }
  },
  {
    id: 'yam',
    addresses: [
      '0x97990B693835da58A281636296D2Bf02787DEa17', // treasury
      '0xd67c05523d8ec1c60760fd017ef006b9f6e496d0', // sushiTreasury
      '0x205cc7463267861002b27021c7108bc230603d0f', // stakedDPI
      '0xd67c05523d8ec1c60760fd017ef006b9f6e496d0', // randomHoldings
    ],
    icon: 'QmcPjtA1Q9QhnAeruXkrsYU3HZ5b8sm3eU78VUjHDXhior',
    iconType: 'image/png',
    snapshotId: 'yam',
    metadata: {
      name: 'Yam Finance',
      website: 'https://yam.finance',
      governanceForum: 'https://forum.yam.finance',
      governanceModel: '',
    },
  },
  {
    id: 'yearn',
    addresses: [
      '0xfeb4acf3df3cdea7399794d0869ef76a6efaff52', // ychad.eth
      '0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde', // treasury.ychad.eth
      '0xd42e1cb8b98382df7db43e0f09dfe57365659d16', // DSProxy
    ],
    icon: 'QmYGdvDA6jM5AV1yBvQKUAz74wqGeBUwVohBWEgbwqXpjk',
    snapshotId: 'yearn',
    metadata: {
      name: 'Yearn',
      website: 'https://yearn.finance',
      governanceForum: 'https://gov.yearn.finance',
      governanceModel: '',
    },
  },
]

export async function setup(sdk: Context) {
  const portfolioCache: { [addresses: string]: Promise<any> } = {}
  const getPortfolio = (addresses: string[]): Promise<any> => {
    const key = addresses.join(',')
    if (!portfolioCache[key]) {
      portfolioCache[key] = fetch(`https://zerion-api.vercel.app/api/portfolio/${key}`)
        .then(req => req.json())
        .then(result => {
          if (result.success) {
            return result.value
          }
          throw new Error(`Request to 'https://zerion-api.vercel.app/api/portfolio/${key}' failed: ${result.message}`)
        })
    }
    return portfolioCache[key]
  }

  const createTreasuryLoader = (addresses: string[]) => async () => {
    const portfolio = await getPortfolio(addresses)
    return portfolio.totalValue
  }

  const createPortfolioLoader = (addresses: string[], vestingAddresses?: string[]) => async () => {
    const [{ portfolio }, { portfolio: vestingPortfolio }] = await Promise.all([
      getPortfolio(addresses),
      vestingAddresses ? getPortfolio(vestingAddresses) : { portfolio: [] },
    ])

    return [
      ...portfolio,
      ...vestingPortfolio.map((portfolioItem: any) => ({ ...portfolioItem, vesting: true }))
    ]
  }

  for (const org of orgs) {
    let recentProposals = async () => []
    if (org.getProposals) {
      recentProposals = () => org.getProposals!(sdk)
    } else if (org.snapshotId) {
      recentProposals = () => getSnapshotProposals(sdk, org.snapshotId!)
    }

    sdk.register({
      id: org.id,
      queries: {
        currentTreasuryUSD: createTreasuryLoader([...org.addresses, ...(org.vestingAddresses || [])]),
        currentLiquidTreasuryUSD: createTreasuryLoader(org.addresses),
        currentTreasuryPortfolio: createPortfolioLoader(org.addresses, org.vestingAddresses),
        recentProposals,
      },
      metadata: {
        ...org.metadata,
        governanceSite: org.snapshotId
          ? `https://snapshot.org/#/${org.snapshotId}`
          : org.governanceSite || null,
        icon: org.icon ? sdk.ipfs.getDataURILoader(org.icon, org.iconType || 'image/svg+xml') : 0,
        category: 'app',
        treasuries: [...org.addresses, ...(org.vestingAddresses || [])],
      },
    })
  }
}
