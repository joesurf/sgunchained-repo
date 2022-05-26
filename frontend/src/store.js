import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { activityListReducer, activityDetailsReducer } from './reducers/activityReducers';
import { experienceReducer } from './reducers/experienceReducers';

const reducer = combineReducers({
  activityList: activityListReducer,
  activityDetails: activityDetailsReducer,
  experience: experienceReducer,
})

const experienceItemsFromStorage = localStorage.getItem('experienceItems')
  ? JSON.parse(localStorage.getItem('experienceItems'))
  : []

const initialState = {
  experience: { experienceItems: experienceItemsFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store