import axios from 'axios';
import { EXPERIENCE_ADD_ITEM, EXPERIENCE_REMOVE_ITEM } from '../constants/experienceConstants';

export const addToExperience = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/activities/${id}`)

  dispatch({
    type: EXPERIENCE_ADD_ITEM,
    payload: {
      activity: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      numPeople: data.numPeople,
      quantity
    }
  })

  localStorage.setItem('experienceItems', JSON.stringify(getState().experience.experienceItems))
}


export const removeFromExperience = (id) => async (dispatch, getState) => {
  dispatch({
    type: EXPERIENCE_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('experienceItem', JSON.stringify(getState().experience.experienceItems))
}