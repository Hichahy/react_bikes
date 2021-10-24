
import { combineReducers } from 'redux'
import bikeReducer  from './bikes/duck'

const rootReducer = combineReducers({
products: bikeReducer
})

export default rootReducer