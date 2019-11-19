import { ERRORS, SET_CURRENT_USER, URL } from './types'
import jwt_decode from 'jwt-decode'

export const login = (userDetails, history) => async dispatch => {
  try {
    let response = await fetch(`${URL}/auth/signin`, {
      method: 'POST',
      body: JSON.stringify(userDetails), 
      headers: {
        'Content-Type': 'application/json',
      }
    });
    response = await response.json();

    if (response.status === 'error') {
      if (typeof response.error === "object") {
        dispatch({
          type: ERRORS,
          payload: response.error
        })
      } else {
        dispatch({
          type: ERRORS,
          payload: {
            feedback: response.error
          }
        })
      }
    } else {
      const { token } = response.data
      //save the token in local storage
      localStorage.setItem('jwtToken', token)

      //decode the jwt token
      const decoded = jwt_decode(token)

      //set current user
      dispatch(setCurrentUser(decoded))

      history.push('/')
    }
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERRORS,
      payload: {
        feedback: 'An error occurred, please try again'
      }
    })
  }
}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch => {
  //remove the toke from localstorage
  localStorage.removeItem('jwtToken');

  //set current user to empty object
  dispatch(setCurrentUser({}));
}