import axios from 'axios';
import { BUCKET_ADD_ITEM, BUCKET_REMOVE_ITEM } from '../constants/bucketConstants';

export const addToBucket = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/activities/id/${id}`)

  dispatch({
    type: BUCKET_ADD_ITEM,
    payload: {
      activity: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      numPeople: data.numPeople,
      quantity
    }
  })

  localStorage.setItem('bucketItems', JSON.stringify(getState().bucket.bucketItems))
}


export const removeFromBucket = (id) => async (dispatch, getState) => {
  dispatch({
    type: BUCKET_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('bucketItem', JSON.stringify(getState().bucket.bucketItems))
}