import { SET_CURRENT_USER } from '../actions/types'

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type){
    case SET_CURRENT_USER:
      if(action.payload){
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload
        }
      }else {
        return {
          ...state
        }
      }
    default:
      return {
        ...state
      }
  }
}