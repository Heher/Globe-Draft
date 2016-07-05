import React from 'react'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'

export default class Login extends React.Component {
  handleFacebookLogin(response) {
    this.props.findOrCreateFacebookUser(response)
  }

  handleGoogleLogin(response) {
    this.props.findOrCreateGoogleUser(response)
  }

  render() {
    return (
      <div>
        <FacebookLogin
          appId="1706414629623051"
          fields="first_name, last_name, email"
          callback={this.handleFacebookLogin.bind(this)} />
        <GoogleLogin
          clientId="813058411917-1su4rbp4op2fjenk5bgmra7jiafoc7fr.apps.googleusercontent.com"
          buttonText="Google Login"
          callback={this.handleGoogleLogin.bind(this)} />
      </div>
    )
  }
}