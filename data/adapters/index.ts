import sdk from '../sdk'

import { setup as setupAave } from './aave'
import { setup as setupBzx } from './bzx'
// import { setup as setupDecentralGames } from './decentralgames'
import { setup as setupDXdao } from './dxdao'
import { setup as setupMakerDAO } from './makerdao'
import { setup as setupPoolTogether } from './pooltogether'
import { setup as setupSimpleTreasuries } from './simple-treasuries'

const feesList = sdk.getList('treasuries')

feesList.addAdaptersWithSetupFunction(setupAave)
feesList.addAdaptersWithSetupFunction(setupBzx)
// feesList.addAdaptersWithSetupFunction(setupDecentralGames)
feesList.addAdaptersWithSetupFunction(setupDXdao)
feesList.addAdaptersWithSetupFunction(setupMakerDAO)
feesList.addAdaptersWithSetupFunction(setupPoolTogether)
feesList.addAdaptersWithSetupFunction(setupSimpleTreasuries)
