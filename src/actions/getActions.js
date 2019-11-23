import { ERRORS, URL } from '../actions/types'

export const getSingleGif = (gifId) => async dispatch => {
  try {
    const Bearer = 'Bearer ' + localStorage.jwtToken;

    let response = await fetch(`${URL}/gifs/${gifId}`, {
      method: 'GET',
      headers: {
        'Authorization': Bearer,
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
      return response
    } else {
      dispatch({
        type: ERRORS,
        payload: {}
      })

      return response
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

export const getSingleArticle = (articleId) => async dispatch => {
  try {
    const Bearer = 'Bearer ' + localStorage.jwtToken;

    let response = await fetch(`${URL}/articles/${articleId}`, {
      method: 'GET',
      headers: {
        'Authorization': Bearer,
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
      return response
    } else {
      dispatch({
        type: ERRORS,
        payload: {}
      })

      return response
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

export const getFeeds = () => async dispatch => {
  try {
    const Bearer = 'Bearer ' + localStorage.jwtToken;

    let response = await fetch(`${URL}/feed`, {
      method: 'GET',
      headers: {
        'Authorization': Bearer,
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
      return response
    } else {
      dispatch({
        type: ERRORS,
        payload: {}
      })

      return response
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