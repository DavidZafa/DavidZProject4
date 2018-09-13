import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import authReducer from '../Reducers/auth'
import roomsReducer from '../Reducers/rooms'

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      rooms: roomsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

  return store
}