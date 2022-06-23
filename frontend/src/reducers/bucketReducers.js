import { BUCKET_ADD_ITEM, BUCKET_REMOVE_ITEM, BUCKET_SAVE_SUBSCRIPTION_DETAILS } from '../constants/bucketConstants';


export const bucketReducer = (state = { bucketItems: [], subscriotionDetails: {} }, action) => {
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

    case BUCKET_SAVE_SUBSCRIPTION_DETAILS:
      return {
        ...state,
        subscriptionDetails: action.payload
      }

    default:
      return state
  }
}