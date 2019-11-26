import { ERRORS, URL, NOTIFICATION } from '../actions/types'

export const postGif = (form, history) => async dispatch => {
  try {
    const formData = new FormData()
    formData.append('title', form.title);
    formData.append('image', form.image);

    const Bearer = 'Bearer ' + localStorage.jwtToken;

    let response = await fetch(`${URL}/gifs`, {
      method: 'POST',
      body: formData,
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
    } else {
      dispatch({
        type: ERRORS,
        payload: {}
      })

      const notification = {
        type: 'success',
        message: 'Post Created Successfully'
      }

      dispatch({
        type: NOTIFICATION,
        payload: notification
      })

      const { gifId } = response.data

      history.push(`/gifs/${gifId}`)
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

export const postArticle = (articleData, history) => async dispatch => {
  try {
    const Bearer = 'Bearer ' + localStorage.jwtToken;

    let response = await fetch(`${URL}/articles`, {
      method: 'POST',
      withCredentials: true,
      body: JSON.stringify(articleData),
      headers: {
        'Authorization': Bearer,
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
      dispatch({
        type: ERRORS,
        payload: {}
      })

      const notification = {
        type: 'success',
        message: 'Article Created Successfully'
      }

      dispatch({
        type: NOTIFICATION,
        payload: notification
      })

      const { articleId } = response.data

      history.push(`/articles/${articleId}`)
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
export const editArticle = (articleData, history) => async dispatch => {
  try {
    const Bearer = 'Bearer ' + localStorage.jwtToken;

    let response = await fetch(`${URL}/articles/${articleData.articleId}`, {
      method: 'PATCH',
      withCredentials: true,
      body: JSON.stringify(articleData),
      headers: {
        'Authorization': Bearer,
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
      dispatch({
        type: ERRORS,
        payload: {}
      })

      const { articleId } = articleData

      const notification = {
        type: 'success',
        message: 'Article Updated Successfully'
      }

      dispatch({
        type: NOTIFICATION,
        payload: notification
      })

      history.push(`/articles/${articleId}`)
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

export const postComment = (data, type) => async dispatch => {
  try {
    const Bearer = 'Bearer ' + localStorage.jwtToken;

    let response = '';
    
    /* eslint-disable default-case */
    switch (type) {
      case 'article':
        response = await fetch(`${URL}/articles/${data.articleId}/comment`, {
          method: 'POST',
          withCredentials: true,
          body: JSON.stringify(data),
          headers: {
            'Authorization': Bearer,
            'Content-Type': 'application/json',
          }
        });
        break;
      case 'gif':
        response = await fetch(`${URL}/gifs/${data.gifId}/comment`, {
          method: 'POST',
          withCredentials: true,
          body: JSON.stringify(data),
          headers: {
            'Authorization': Bearer,
            'Content-Type': 'application/json',
          }
        });
        break;
    }

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
        return response
      }
    } else {
      dispatch({
        type: ERRORS,
        payload: {}
      })

      const notification = {
        type: 'success',
        message: 'Comment Created Successfully'
      }

      dispatch({
        type: NOTIFICATION,
        payload: notification
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