import { authService, api } from '../../../services';
import { pushSnackbar } from '../../ui/actions';
import * as AuthTypes from './../types';

export const signIn = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(authPending(true));

    try {
      const data = await authService.signIn({
        email,
        password,
      });

      dispatch(signInSuccess(data));
      api.setUserInfo(JSON.stringify(data));

      dispatch(updateRedirectUrl('/'));
      dispatch(authPending(false));
      dispatch(pushSnackbar('Successfully Logged In', 'success'));
    } catch (error) {
      dispatch(signInFail(error));
      dispatch(pushSnackbar('Sign In Failed!', 'error'));

      dispatch(authPending(false));
    }
  };
};

export const signUp = (
  name,
  email,
  password,
  addressOne,
  addressTwo,
  postcode,
  phone
) => {
  return async (dispatch, getState) => {
    dispatch(authPending(true));
    try {
      const data = await authService.signUp({
        name,
        email,
        password,
      });

      dispatch(signUpSuccess(data));

      api.setUserInfo(JSON.stringify(data));
      dispatch(updateRedirectUrl('/'));

      dispatch(authPending(false));

      dispatch(pushSnackbar('Successfully registerd', 'success'));
    } catch (error) {
      dispatch(signUpFail(error));

      dispatch(authPending(false));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    api.clearUserInfo();
    window.location.href = '/';
    dispatch({
      type: AuthTypes.LOG_OUT,
    });
    dispatch(pushSnackbar('Logged Out', 'warning'));
  };
};

const signInSuccess = (data) => ({
  type: AuthTypes.POST_SIGNIN_SUCCESS,
  payload: { data },
});

const signInFail = (err) => ({
  type: AuthTypes.POST_SIGNIN_FAILED,
  payload: { error: err },
});

const signUpSuccess = (data) => ({
  type: AuthTypes.POST_SIGNUP_SUCCESS,
  payload: { data },
});

const signUpFail = (error) => ({
  type: AuthTypes.POST_SIGNUP_FAILED,
  payload: { error },
});

const authPending = (pending) => ({
  type: AuthTypes.AUTHENTICATION_PENDING,
  payload: { pending },
});

export const updateRedirectUrl = (url) => ({
  type: AuthTypes.UPDATE_REDIRECT_URL,
  payload: url,
});
