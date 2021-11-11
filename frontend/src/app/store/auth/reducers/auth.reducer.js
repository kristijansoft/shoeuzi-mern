import * as AuthTypes from './../types';

/* LocalStorage */
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

/* End */

const initialState = {
  pending: false,
  isAuthenticated: userInfoFromStorage ? true : false,
  token: null,
  userInfo: userInfoFromStorage,
  error: null,
  redirect_url: '',
  actionData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthTypes.POST_SIGNIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.data.token,
        userInfo: action.payload.data,
      };
    case AuthTypes.POST_SIGNIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userInfo: {},
      };
    case AuthTypes.POST_SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.data.token,
        userInfo: action.payload.data,
      };
    case AuthTypes.AUTHENTICATION_PENDING:
      return {
        ...state,
        pending: action.payload.pending,
      };
    case AuthTypes.LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userInfo: {},
      };
    case AuthTypes.UPDATE_REDIRECT_URL:
      return {
        ...state,
        redirect_url: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
