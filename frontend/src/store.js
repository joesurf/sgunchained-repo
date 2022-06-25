import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { activityListReducer, activityDetailsReducer } from './reducers/activityReducers';
import { bucketReducer } from './reducers/bucketReducers';
import { 
  userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, 
  userListReducer, userDeleteReducer, userUpdateReducer 
} from './reducers/userReducers';

const reducer = combineReducers({
  activityList: activityListReducer,
  activityDetails: activityDetailsReducer,
  bucket: bucketReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
})

const bucketItemsFromStorage = localStorage.getItem('bucketItems')
  ? JSON.parse(localStorage.getItem('bucketItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

  const subscriptionDetailsFromStorage = localStorage.getItem('subscriptionDetails')
  ? JSON.parse(localStorage.getItem('subscriptionDetails'))
  : {}


// Take state info from local storage (browser) and input into redux store
const initialState = {
  bucket: { 
    bucketItems: bucketItemsFromStorage,
    subscriptionDetails: subscriptionDetailsFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage }
}

// To add logic that interacts with redux store outside UI layer
const middleware = [thunk]

// Create store and add dev tools extension
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store