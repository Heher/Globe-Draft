import React from 'react'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'

require('../css/login.sass')

export default class Login extends React.Component {
  handleFacebookLogin(response) {
    this.props.findOrCreateFacebookUser(response)
  }

  handleGoogleLogin(response) {
    this.props.findOrCreateGoogleUser(response)
  }

  render() {
    return (
      <div className="login-wrapper">
        <h2>Login</h2>
        <p>Sign in to Facebook or Google using the same account you used to register.</p>
        <FacebookLogin
          appId="1706414629623051"
          textButton=""
          fields="first_name, last_name, email"
          callback={this.handleFacebookLogin.bind(this)}
          cssClass="facebook-login"
          icon="fa-facebook"
        />
        <GoogleLogin
          clientId="813058411917-1su4rbp4op2fjenk5bgmra7jiafoc7fr.apps.googleusercontent.com"
          buttonText=""
          callback={this.handleGoogleLogin.bind(this)}
          cssClass="google-login"
        >
          <i className="fa fa-google"></i>
        </GoogleLogin>
        <h2>Register</h2>
        <p>Logins are powered by Facebook and Google.
        Contact me with the email address you wish to use that is associated with a 
        Facebook or Google account and I will give you access to register.</p>
      </div>
    )
  }
}