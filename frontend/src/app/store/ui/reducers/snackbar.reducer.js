import * as UiActionTypes from './../types';

const initialState = {
  message: '',
  variant: '',
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case UiActionTypes.ENQUE_SNACKBAR:
      return {
        message: action.payload.message,
        variant: action.payload.variant,
      };
    default:
      return state;
  }
};

export default snackbarReducer;
