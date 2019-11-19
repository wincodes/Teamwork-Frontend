import { ERRORS } from '../actions/types'

export default (state = {}, action) => {
  switch(action.type){
    case ERRORS:
      return action.payload
    default:
      return state
  }
}