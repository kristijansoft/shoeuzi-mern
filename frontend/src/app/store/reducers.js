import { combineReducers } from 'redux';
import authReducer from './auth/reducers/auth.reducer';
import ui from './ui/reducers';

const createReducer = (asyncReducers) =>
  combineReducers({
    auth: authReducer,
    ui,
    ...asyncReducers,
  });

export default createReducer;
