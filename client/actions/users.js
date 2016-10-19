import fetch from 'isomorphic-fetch'
import { fetchError } from './actionCreators'

export function requestUsers() {
  return {
    type: 'REQUEST_USERS'
  }
}

export function receiveUsers(users) {
  return {
    type: 'RECEIVE_USERS',
    users
  }
}

export function setCurrentUser(payload) {
  return {
    type: 'SET_CURRENT_USER',
    payload
  }
}

export function findCurrentUser(users, token) {
  return dispatch => {
    const currentUser = users.find(user => user.id_token === token)
    if (currentUser) {
      dispatch(setCurrentUser(currentUser))
    }
  }
}

export function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers())
    return fetch('/api/users', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response =>
        response.json().then(users => ({ users, response }))
      ).then(({ users }) => {
        dispatch(receiveUsers(users))
        const token = localStorage.getItem('id_token') ? localStorage.getItem('id_token') : null
        dispatch(findCurrentUser(users, token))
      }).catch(error => dispatch(fetchError(error)))
  }
}

export function userFetchError(payload) {
  return {
    type: 'USER_FETCH_ERROR',
    payload
  }
}

export function savedUser(id, payload) {
  return {
    type: 'SAVED_USER',
    id,
    payload
  }
}

export function editUser(id, payload) {
  return dispatch => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        payload
      })
    })
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user }) => {
        dispatch(savedUser(user._id, user))
      }).catch(error => dispatch(fetchError(error)))
  }
}

export function loginSuccess() {
  return {
    type: 'LOGIN_SUCCESS'
  }
}

export function findOrCreateFacebookUser(payload) {
  return dispatch => {
    return fetch('/auth/facebook', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payload
      })
    })
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user }) => {
        localStorage.setItem('id_token', user.id_token)
        dispatch(setCurrentUser(user))
        dispatch(loginSuccess())
      }).catch(error => dispatch(fetchError(error)))
  }
}

export function findOrCreateGoogleUser(payload) {
  return dispatch => {
    return fetch('/auth/google', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payload: payload.wc
      })
    })
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user }) => {
        localStorage.setItem('id_token', user.id_token)
        dispatch(setCurrentUser(user))
        dispatch(loginSuccess())
      }).catch(error => dispatch(fetchError(error)))
  }
}

export function updateCurrentUser(payload) {
  return {
    type: 'UPDATE_CURRENT_USER',
    payload
  }
}

export function logoutUser(id) {
  return {
    type: 'LOGOUT_USER',
    id
  }
}

export function signInAsUser(users, token) {
  return dispatch => {
    localStorage.setItem('id_token', token)
    dispatch(findCurrentUser(users, token))
  }
}

export function loginEmailNotFound(error) {
  return {
    type: 'LOGIN_EMAIL_NOT_FOUND',
    error
  }
}

export function userNeedsToPay() {
  return {
    type: 'USER_NEEDS_TO_PAY'
  }
}

export function chargeCard(id, token) {
  return dispatch => {
    return fetch('/stripe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stripeToken: token
      })
    })
      .then(response =>
        response.json().then(charge => ({ charge, response }))
      ).then(() => {
        dispatch(editUser(id, { hasPaid: true }))
        dispatch(updateCurrentUser({ hasPaid: true }))
        dispatch(loginSuccess())
      }).catch(error => dispatch(fetchError(error)))
  }
}
