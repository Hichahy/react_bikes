
import { combineReducers } from 'redux'
import bikeReducer  from './bikes/duck'
import accountsReducer  from "./accounts/duck"

const rootReducer = combineReducers({
products: bikeReducer,
accounts: accountsReducer,
})

export default rootReducer