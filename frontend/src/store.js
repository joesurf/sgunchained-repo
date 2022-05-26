import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { activityListReducer, activityDetailsReducer } from './reducers/activityReducers';

const reducer = combineReducers({
  activityList: activityListReducer,
  activityDetails: activityDetailsReducer,
})


const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store