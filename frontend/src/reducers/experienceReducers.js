import { EXPERIENCE_ADD_ITEM, EXPERIENCE_REMOVE_ITEM } from '../constants/experienceConstants';


export const experienceReducer = (state = { experienceItems: [] }, action) => {
  switch (action.type) {
    case EXPERIENCE_ADD_ITEM:
      const item = action.payload
      const existItem = state.experienceItems.find(x => x.activity === item.activity)

      if (existItem) {
        return {
          ...state,
          experienceItems: state.experienceItems.map(x => 
            x.activity === existItem.activity ? item : x)
        }
        
      } else {
        return {
          ...state,
          experienceItems: [...state.experienceItems, item]
        }
      }

    case EXPERIENCE_REMOVE_ITEM:
      return {
        ...state,
        experienceItems: state.experienceItems.filter(x => x.activity !== action.payload)
      }

    default:
      return state
  }
}