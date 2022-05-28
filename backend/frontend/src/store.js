import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { activityListReducer, activityDetailsReducer } from './reducers/activityReducers';
import { experienceReducer } from './reducers/experienceReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';

const reducer = combineReducers({
  activityList: activityListReducer,
  activityDetails: activityDetailsReducer,
  experience: experienceReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
})

const experienceItemsFromStorage = localStorage.getItem('experienceItems')
  ? JSON.parse(localStorage.getItem('experienceItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  experience: { experienceItems: experienceItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store