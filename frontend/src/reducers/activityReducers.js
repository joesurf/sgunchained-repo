import { 
  ACTIVITY_LIST_REQUEST,
  ACTIVITY_LIST_SUCCESS,
  ACTIVITY_LIST_FAIL,

  ACTIVITY_DETAILS_REQUEST,
  ACTIVITY_DETAILS_SUCCESS,
  ACTIVITY_DETAILS_FAIL,

  ACTIVITY_DELETE_REQUEST,
  ACTIVITY_DELETE_SUCCESS,
  ACTIVITY_DELETE_FAIL,
 } from '../constants/activityConstants';


export const activityListReducer = (state = { activities: [] }, action) => {
  switch(action.type){
    case ACTIVITY_LIST_REQUEST:
      return { loading: true, activities: [] }

    case ACTIVITY_LIST_SUCCESS:
      return { loading: false, activities: action.payload }
    
    case ACTIVITY_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}


export const activityDetailsReducer = (state = { activity: {reviews: []} }, action) => {
  switch(action.type){
    case ACTIVITY_DETAILS_REQUEST:
      return { loading: true, ...state }

    case ACTIVITY_DETAILS_SUCCESS:
      return { loading: false, activity: action.payload }
    
    case ACTIVITY_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}


export const activityDeleteReducer = (state = { }, action) => {
  switch(action.type){
    case ACTIVITY_DELETE_REQUEST:
      return { loading: true }

    case ACTIVITY_DELETE_SUCCESS:
      return { loading: false, success: true }
    
    case ACTIVITY_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}