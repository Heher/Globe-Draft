import React from 'react'
import FacebookLogin from 'react-facebook-login'

export default class Login extends React.Component {
  handleLogin(response) {
    this.props.findOrCreateFacebookUser(response)
  }

  render() {
    return (
      <div>
        <FacebookLogin
          appId="1706414629623051"
          fields="first_name, last_name"
          callback={this.handleLogin.bind(this)} />
      </div>
    )
  }
}