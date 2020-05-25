/*
 *
 * LoginPage reducer
 *
 */

import ActionTypes from './constants';
import {ContainerState, ContainerActions} from './types';

const user_profile = localStorage.getItem('user_profile') || null;
const user = user_profile ? JSON.parse(user_profile).user : {};
export const initialState: ContainerState = {
    isLoading: false,
    isLoggedIn: false,
    email: user_profile && user && user.email ? user.email : '',
    name: user_profile && user && user.name ? user.name : '',
    avatar: user_profile && user && user.avatar ? user.avatar : '',
    password: '',
    account: {},
    token: ''
  }
;

function loginPageReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.POST_LOGIN:
      return {
        ...state,
        isLoading: true,
        email: action.payload.email,
        password: action.payload.password,
        isLoggedIn: false,
        validationErrors: undefined
      };
    case ActionTypes.POST_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        validationErrors: {
          messages: action.payload,
          general: true
        }
      };
    case ActionTypes.POST_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: true,
        isLoggedIn: true,
        email: action.payload.user.email,
        avatar: action.payload.user.avatar,
        name: action.payload.user.name,
        account: action.payload.user,
        validationErrors: undefined
      };
    case ActionTypes.CLEAR_LOGIN:
      return {
        ...state,
        isLoading: false,
        email: '',
        password: '',
        isLoggedIn: false,
        validationErrors: undefined
      };
    default:
      return state;
  }
}

export default loginPageReducer;
