import React from 'react'
import { ReactScriptLoaderMixin } from 'react-script-loader'

const PaymentForm = React.createClass({
  mixins: [ ReactScriptLoaderMixin ],

  getInitialState() {
    return {
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
    else {
      return (
        <form onSubmit={this.onSubmit} >
          <span>{ this.state.paymentError }</span><br />
          <input type='text' data-stripe='number' placeholder='credit card number' /><br />
          <input type='text' data-stripe='exp-month' placeholder='expiration month' /><br />
          <input type='text' data-stripe='exp-year' placeholder='expiration year' /><br />
          <input type='text' data-stripe='cvc' placeholder='cvc' /><br />
          <input disabled={this.state.submitDisabled} type='submit' value='Purchase' />
        </form>
      )
    }
  }
})

export default PaymentForm