import { ERRORS, URL, NOTIFICATION } from '../actions/types'

export const deleteArticle = (articleId, history) => async dispatch => {
  try {
    const Bearer = 'Bearer ' + localStorage.jwtToken;

    let response = await fetch(`${URL}/articles/${articleId}`, {
      method: 'DELETE',
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
    } else  if(response.status === 'success') {
      dispatch({
        type: ERRORS,
        payload: {}
      })

      const notification = {
        type: 'success',
        message: 'Article Deleted Successfully'
      }

      dispatch({
        type: NOTIFICATION,
        payload: notification
      })

      history.push(`/feeds`)

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

export const deleteGif = (gifId, history) => async dispatch => {
  try {
    const Bearer = 'Bearer ' + localStorage.jwtToken;

    let response = await fetch(`${URL}/gifs/${gifId}`, {
      method: 'DELETE',
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
    } else  if(response.status === 'success') {
      dispatch({
        type: ERRORS,
        payload: {}
      })

      const notification = {
        type: 'success',
        message: 'Post Deleted Successfully'
      }

      dispatch({
        type: NOTIFICATION,
        payload: notification
      })

      history.push(`/feeds`)

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

export const deleteNotification = () => async dispatch => {
  dispatch({
    type: NOTIFICATION,
    payload: {}
  })
}