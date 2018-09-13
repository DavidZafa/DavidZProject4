import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './Routers/AppRouter';
import Store from './Store/store'
import {login, logout} from './Actions/auth'
import {sendMessage} from './Actions/rooms'
import database, {firebase} from './Firebase/firebase'
import {startListening, setStartState, clearState} from './Actions/rooms'
import LoadingPage from './Components/loading'

const store = Store()
const jsx = (
  <Provider store = {store}>
  <AppRouter />
  </Provider>
)
let hasRendered = false

const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementByID('app'))
    hasRendered= true
  }
}


firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    const name = user.displayName ? user.displayName: user.email
    store.dispatch(login(user.uid,name))
    store.dispatch(setStartState())
    renderApp()
    if(history.location.pathname == '/') {
      history.push('/join')
    }
  } else {
    store.dispatch(logout())
     store.dispatch(clearState)
     renderApp()
     history.push('/')
   }
 })
