import sdk from '../sdk'

import { setup as setupBzx } from './bzx'
// import { setup as setupDecentralGames } from './decentralgames'
import { setup as setupDXdao } from './dxdao'
import { setup as setupPoolTogether } from './pooltogether'

const feesList = sdk.getList('treasuries')

/*
 * This code is being migrated to CryptoStats's treasuries collection
 * See https://cryptostats.community/discover/treasuries
 */
feesList.addAdaptersWithSetupFunction(setupBzx)
// feesList.addAdaptersWithSetupFunction(setupDecentralGames)
feesList.addAdaptersWithSetupFunction(setupDXdao)
feesList.addAdaptersWithSetupFunction(setupPoolTogether)
