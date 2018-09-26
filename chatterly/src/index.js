
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import AppRouter, { history } from './Routers/AppRouter'
import Store from './Store/store'
import LoadingPage from './Components/loading'
import {login, logout} from './Actions/auth'
import {sendMessage} from './Actions/rooms'
import database, {firebase} from './Firebase/firebase'
import {startListening, setStartState, clearState} from './Actions/rooms'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const store = Store()

store.dispatch(startListening())

const renderApp = () => {

ReactDOM.render(<Provider store={store}>
    <AppRouter />
    </Provider>,
    document.getElementById('app'))
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid))
    store.dispatch(setStartState())
    renderApp()
    if (history.location.pathname === '/') {
      history.push('/join')
    }
  } else {
    store.dispatch(logout())
    store.dispatch(clearState)
    renderApp()
    history.push('/')
  }
})
