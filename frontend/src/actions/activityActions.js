import axios from 'axios';
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

  ACTIVITY_CREATE_REQUEST,
  ACTIVITY_CREATE_SUCCESS,
  ACTIVITY_CREATE_FAIL,
  ACTIVITY_CREATE_RESET,

  ACTIVITY_UPDATE_REQUEST,
  ACTIVITY_UPDATE_SUCCESS,
  ACTIVITY_UPDATE_FAIL,
  ACTIVITY_UPDATE_RESET,
} from '../constants/activityConstants';

export const listActivities = (tag="") => async (dispatch) => {
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


export const deleteActivity = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTIVITY_DELETE_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.delete(
      `/api/activities/delete/${id}/`,
      config
    )

    dispatch({
      type: ACTIVITY_DELETE_SUCCESS,
    })

  } catch (error) {
    dispatch({
      type: ACTIVITY_DELETE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    })
  }
}

export const createActivity = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTIVITY_CREATE_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(
      `/api/activities/create/`,
      {}, // data created in backend, empty data sent for post request
      config
    )

    dispatch({
      type: ACTIVITY_CREATE_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: ACTIVITY_CREATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    })
  }
 }


 export const updateActivity = (activity) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTIVITY_UPDATE_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      `/api/activities/update/${activity._id}/`,
      activity, // data created in backend, empty data sent for post request
      config
    )

    dispatch({
      type: ACTIVITY_UPDATE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: ACTIVITY_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: ACTIVITY_UPDATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    })
  }
 }