import { BUCKET_ADD_ITEM, BUCKET_REMOVE_ITEM } from '../constants/bucketConstants';


export const bucketReducer = (state = { bucketItems: [] }, action) => {
  switch (action.type) {
    case BUCKET_ADD_ITEM:
      const item = action.payload
      const existItem = state.bucketItems.find(x => x.activity === item.activity)

      if (existItem) {
        return {
          ...state,
          bucketItems: state.bucketItems.map(x => 
            x.activity === existItem.activity ? item : x)
        }
        
      } else {
        return {
          ...state,
          bucketItems: [...state.bucketItems, item]
        }
      }

    case BUCKET_REMOVE_ITEM:
      return {
        ...state,
        bucketItems: state.bucketItems.filter(x => x.activity !== action.payload)
      }

    default:
      return state
  }
}