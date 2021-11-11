import * as UiActionTypes from '../types';

export const pushSnackbar = (message, variant) => {
  return (dispatch) => {
    dispatch({
      type: UiActionTypes.ENQUE_SNACKBAR,
      payload: {
        message,
        variant,
      },
    });
  };
};
