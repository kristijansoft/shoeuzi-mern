import { combineReducers } from 'redux';
import snackbarReducer from './snackbar.reducer';

const uiReducer = combineReducers({
  snackbar: snackbarReducer,
});

export default uiReducer;
