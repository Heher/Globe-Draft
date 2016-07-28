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
      Stripe.setPublishableKey('pk_test_HMkCJyde6gvUEeFEGlsvdeI9')
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
        self.props.chargeCard(self.state.token)
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
      return <div>Loading</div>
    }
    else if (this.state.stripeLoadingError) {
      return <div>Error</div>
    }
    else if (this.state.paymentComplete) {
      return <div>Payment Complete!</div>
    }
    else if (this.state.showForm) {
      return (
        <div className="registration">
          <p>$20 buy-in:</p>
          <form onSubmit={this.onSubmit} >
            <span>{ this.state.paymentError }</span>
            <input type='text' data-stripe='number' placeholder='Card Number' />
            <div className="card-details">
              <input type='text' data-stripe='exp-month' placeholder='MM' />
              <input type='text' data-stripe='exp-year' placeholder='YYYY' />
              <input type='text' data-stripe='cvc' placeholder='CVC' />
            </div>
            <input disabled={this.state.submitDisabled} type='submit' value='REGISTER' />
          </form>
        </div>
      )
    } else {
      return (
        <button onClick={this.toggleRegistration}>REGISTER</button>
      )
    }
  }
})

export default PaymentForm