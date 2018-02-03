import React from 'react'
import { Link } from 'react-router'

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
    if (this.props.loginButtonShow) {
      return (
        <li>
          <div className="login-wrapper">
            <FacebookLogin
              appId="1706414629623051"
              textButton=""
              fields="first_name, last_name, email"
              callback={(event) => this.handleFacebookLogin(event)}
              cssClass="facebook-login"
              icon="fa-facebook"
            />
            <GoogleLogin
              clientId="813058411917-1su4rbp4op2fjenk5bgmra7jiafoc7fr.apps.googleusercontent.com"
              buttonText=""
              onSuccess={(event) => this.handleGoogleLogin(event)}
              className="google-login"
            >
              <i className="fa fa-google" />
            </GoogleLogin>
          </div>
        </li>
      )
    }
    return (
      <li>
        <Link to="#" onClick={(event) => this.props.toggleLoginButtons(event)}>
          <span>Login</span>
        </Link>
      </li>
    )
  }
}

Login.propTypes = {
  findOrCreateFacebookUser: React.PropTypes.func.isRequired,
  findOrCreateGoogleUser: React.PropTypes.func.isRequired,
  loginButtonShow: React.PropTypes.bool.isRequired,
  toggleLoginButtons: React.PropTypes.func.isRequired
}
