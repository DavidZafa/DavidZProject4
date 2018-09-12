import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import Header from '../Components/header'
import ShowRoom from '../Components/showroom'


export const LoggedIn = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component = {(props) => (
    isAuthenticated ? (
      <div>
      <Header />
      <div className = 'container'>
      <ShowRoom />
      <Component {...props} />
      </div>
      </div>
    ) : (
      <Redirect to="/" />
    )
  )} />
)


const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(LoggedIn);
