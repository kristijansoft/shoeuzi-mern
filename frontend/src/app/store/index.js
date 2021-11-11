import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from './middleware/logger';
import createReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  createReducer(),
  composeEnhancers(applyMiddleware(thunkMiddleware, logger))
);

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));

  return store;
};

export default store;
