import accountsReducer from './accounts/duck'
import bikeReducer from './bikes/duck'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  products: bikeReducer,
  accounts: accountsReducer
})

export default rootReducer
