import { ERRORS, URL } from '../actions/types'

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