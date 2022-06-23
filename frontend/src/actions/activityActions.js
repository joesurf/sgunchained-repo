import axios from 'axios';
import { 
  ACTIVITY_LIST_REQUEST,
  ACTIVITY_LIST_SUCCESS,
  ACTIVITY_LIST_FAIL,

  ACTIVITY_DETAILS_REQUEST,
  ACTIVITY_DETAILS_SUCCESS,
  ACTIVITY_DETAILS_FAIL,
 } from '../constants/activityConstants';

 export const listActivities = (tag) => async (dispatch) => {
  try {
    dispatch({ type: ACTIVITY_LIST_REQUEST })

    const { data } = await axios.get(`/api/activities/${tag}`)

    setTimeout(function() {
      dispatch({
        type: ACTIVITY_LIST_SUCCESS,
        payload: data
      })    
    }, 500);


  } catch (error) {
    dispatch({
      type: ACTIVITY_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
 }


 export const listActivityDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACTIVITY_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/activities/id/${id}`)

    dispatch({
      type: ACTIVITY_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: ACTIVITY_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
 }