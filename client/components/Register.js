import React from 'react'

import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'

require('../css/login.sass')

export default class Register extends React.Component {
  handleFacebookLogin(response) {
    this.props.findOrCreateFacebookUser(response)
  }

  handleGoogleLogin(response) {
    this.props.findOrCreateGoogleUser(response)
  }

  render() {
    const { currentUser } = this.props

    if (currentUser._id) {
      return null
    }
    return (
      <div className="login-wrapper">
        <p>Register with Facebook or Google</p>
        <div className="login-buttons">
          <FacebookLogin
            appId="1706414629623051"
            textButton=""
            fields="first_name, last_name, email"
            callback={() => this.handleFacebookLogin()}
            cssClass="facebook-login"
            icon="fa-facebook"
          />
          <GoogleLogin
            clientId="813058411917-1su4rbp4op2fjenk5bgmra7jiafoc7fr.apps.googleusercontent.com"
            buttonText=""
            callback={() => this.handleGoogleLogin()}
            cssClass="google-login"
          >
            <i className="fa fa-google" />
          </GoogleLogin>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  findOrCreateFacebookUser: React.PropTypes.func.isRequired,
  findOrCreateGoogleUser: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired,
}
