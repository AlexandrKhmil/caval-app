import * as actionType from '../constants/action-type';

const initialState = {
  email: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  isAuth: false,
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case actionType.ACCOUNT_AUTH_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case actionType.ACCOUNT_AUTH_SUCCESS: { 
      return {
        ...state,
        ...payload,
        isLoading: false,
        isAuth: true,
      }
    }
    case actionType.ACCOUNT_AUTH_FAIL: {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isLoading: false,
      }
    }

    case actionType.ACCOUNT_LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionType.ACCOUNT_LOGIN_SUCCESS: {
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isLoading: false,
        isAuth: true,
      };
    }
    case actionType.ACCOUNT_LOGIN_FAIL: {
      return {
        ...state,
        email: null,
        token: null,
        isLoading: false,
        isAuth: false,
      };
    }

    case actionType.ACCOUNT_REGISTRATION_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case actionType.ACCOUNT_REGISTRATION_SUCCESS: {
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isLoading: false,
        isAuth: true,
      };
    }
    case actionType.ACCOUNT_REGISTRATION_FAIL: {
      return {
        ...state,
        email: null,
        token: null,
        isLoading: false,
        isAuth: false,
      };
    }

    case actionType.ACCOUNT_LOGOUT: {
      localStorage.removeItem('token');
      return {
        ...state,
        email: null,
        token: null,
        isLoading: false,
        isAuth: false,
      }
    }

    default: {
      return state;
    }
  }
}