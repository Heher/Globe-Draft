import React from 'react'
import { ReactScriptLoaderMixin } from 'react-script-loader'

const PaymentForm = React.createClass({
  mixins: [ ReactScriptLoaderMixin ],

  getInitialState() {
    return {
      showForm: false,
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null
    }
  },

  getScriptURL() {
    return 'https://js.stripe.com/v2/'
  },

  onScriptLoaded() {
    if (!PaymentForm.getStripeToken) {
      Stripe.setPublishableKey('pk_live_4Fqx6shhRXkvx3IINsb1l9Cg')
      this.setState({ stripeLoading: false, stripeLoadingError: false })
    }
  },

  onScriptError() {
    this.setState({ stripeLoading: false, stripeLoadingError: true })
  },

  onSubmit(event) {
    var self = this
    event.preventDefault()
    this.setState({ submitDisabled: true, paymentError: null })
    // send form here
    Stripe.createToken(event.target, function(status, response) {
      if (response.error) {
        self.setState({ paymentError: response.error.message, submitDisabled: false })
      }
      else {
        self.setState({ paymentComplete: true, submitDisabled: false, token: response.id })
        // make request to your server here!
        self.props.chargeCard(self.props.currentUser._id, self.state.token)
      }
    })
  },

  toggleRegistration() {
    this.setState({
      showForm: !this.state.showForm
    })
  },

  render() {
    if (this.state.stripeLoading) {
      return (
        <div className="registration">
          <p>Loading</p>
        </div>
      )
    }
    else if (this.state.stripeLoadingError) {
      return (
        <div className="registration">
          <p>Error loading payment form. Please try again.</p>
        </div>
      )
    } else {
      return (
        <div className="registration">
          <p>Pay $20 buy-in to complete registration:</p>
          <form onSubmit={this.onSubmit} >
            <input type='text' data-stripe='number' placeholder='Card Number' />
            <div className="card-details">
              <input type='text' data-stripe='exp-month' placeholder='MM' />
              <input type='text' data-stripe='exp-year' placeholder='YYYY' />
              <input type='text' data-stripe='cvc' placeholder='CVC' />
            </div>
            <input 
              className={this.state.submitDisabled ? "disabled" : ""}
              disabled={this.state.submitDisabled} 
              type='submit' 
              value='PAY'
            />
          </form>
          <span>{ this.state.paymentError }</span>
        </div>
      )
    }
  }
})

export default PaymentForm