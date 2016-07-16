import fetch from 'isomorphic-fetch'

export function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers())
    return fetch('/api/users')
      .then(response => 
        response.json().then(users => ({ users, response }))
      ).then(({ users, response }) => {
        if (!response.ok) {
          console.log("Poop")
          dispatch(userFetchError(users.message))
          return Promise.reject(users)
        }
        else {
          dispatch(receiveUsers(users))
          let token = localStorage.getItem('id_token') ? localStorage.getItem('id_token') : null
          dispatch(findCurrentUser(users, token))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function requestUsers() {
  return {
    type: "REQUEST_USERS"
  }
}

export function userFetchError(payload) {
  console.log("USER FETCH ERROR:", payload)
  return {
    type: "USER_FETCH_ERROR",
    payload
  }
}

export function receiveUsers(users) {
  return {
    type: "RECEIVE_USERS",
    users
  }
}

export function findOrCreateFacebookUser(payload) {
  return dispatch => {
    return fetch('/auth/facebook', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payload
      })
    })
      .then(response => 
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else if (user.error === "Email") {
          dispatch(loginEmailNotFound())
        } else {
          localStorage.setItem('id_token', user.id_token)
          dispatch(setCurrentUser(user))
          dispatch(loginSuccess())
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function findOrCreateGoogleUser(payload) {
  return dispatch => {
    return fetch('/auth/google', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payload: payload.wc
      })
    })
      .then(response => 
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else if (user.error === "Email") {
          dispatch(loginEmailNotFound())
        } else {
          localStorage.setItem('id_token', user.id_token)
          dispatch(setCurrentUser(user))
          dispatch(loginSuccess())
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function findCurrentUser(users, token) {
  return dispatch => {
    const currentUser = users.filter(user => {
      return user.id_token === token
    })[0]
    if (currentUser) {
      dispatch(setCurrentUser(currentUser))
    }
  }
}

export function setCurrentUser(payload) {
  return {
    type: "SET_CURRENT_USER",
    payload
  }
}

export function logoutUser(id) {
  return {
    type: "LOGOUT_USER",
    id
  }
}

export function signInAsUser(users, token) {
  return dispatch => {
    localStorage.setItem('id_token', token)
    dispatch(findCurrentUser(users, token))
  }
}

export function loginEmailNotFound() {
  return {
    type: "LOGIN_EMAIL_NOT_FOUND"
  }
}

export function loginSuccess() {
  return {
    type: "LOGIN_SUCCESS"
  }
}