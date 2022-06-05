import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { activityListReducer, activityDetailsReducer } from './reducers/activityReducers';
import { bucketReducer } from './reducers/bucketReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';

const reducer = combineReducers({
  activityList: activityListReducer,
  activityDetails: activityDetailsReducer,
  bucket: bucketReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
})

const bucketItemsFromStorage = localStorage.getItem('bucketItems')
  ? JSON.parse(localStorage.getItem('bucketItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  bucket: { bucketItems: bucketItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store