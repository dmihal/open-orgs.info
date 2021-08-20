import sdk from '../sdk'

import { setup as setupAave } from './aave'
import { setup as setupDecentralGames } from './decentralgames'
import { setup as setupMakerDAO } from './makerdao'
import { setup as setupSimpleTreasuries } from './simple-treasuries'

const feesList = sdk.getList('treasuries')

feesList.addAdaptersWithSetupFunction(setupAave)
feesList.addAdaptersWithSetupFunction(setupDecentralGames)
feesList.addAdaptersWithSetupFunction(setupMakerDAO)
feesList.addAdaptersWithSetupFunction(setupSimpleTreasuries)
