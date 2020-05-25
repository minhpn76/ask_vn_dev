/*
 *
 * SignUpPage reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  isLoading: false,
  isSignUp: false,
  name: '',
  email: '',
  country: '',
  password: '',
  avatar: '',
  password_confirmation: '',
  account: {},
  token: ''
};

function signUpPageReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.POST_SIGN_UP:
      return {
        ...state,
        isLoading: true,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        country: action.payload.country,
        password_confirmation: action.payload.password_confirmation,
        isSignUp: false,
        validationErrors: undefined
      };
    case ActionTypes.POST_SIGN_UP_ERROR:
      return {
        ...state,
        isLoading: false,
        isSignUp: false,
        validationErrors: {
          ...state.validationErrors,
          general: true
        }
      };
    case ActionTypes.POST_SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: true,
        isSignUp: true,
        email: action.payload.email,
        avatar: action.payload.avatar,
        account: action.payload,
        validationErrors: undefined
      }; 
    case ActionTypes.CLEAR_SIGN_UP:
      return {
        ...state,
        isLoading: true,
        isSignUp: false,
        validationErrors: undefined
      };

    case ActionTypes.LOGIN_FACEBOOK:
      return {
        ...state,
        isLoading: true,
        isSignUp: false,
        token: action.payload,
        validationErrors: undefined
      };
    case ActionTypes.LOGIN_FACEBOOK_ERROR:
      return {
        ...state,
        isLoading: false,
        isSignUp: false,
        validationErrors: {
          messages: action.payload,
          general: true
        }
      };
    case ActionTypes.LOGIN_FACEBOOK_SUCCESS:
      return {
        ...state,
        isLoading: true,
        isSignUp: true,
        validationErrors: undefined
      }; 
    
    case ActionTypes.LOGIN_GOOGLE:
      return {
        ...state,
        isLoading: true,
        token: action.payload,
        isSignUp: false,
        validationErrors: undefined
      };
    case ActionTypes.LOGIN_GOOGLE_ERROR:
      return {
        ...state,
        isLoading: false,
        isSignUp: false,
        validationErrors: {
          messages: action.payload,
          general: true
        }
      };
    case ActionTypes.LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        isLoading: true,
        isSignUp: true,
        validationErrors: undefined
      }; 
    default:
      return state;
  }
}

export default signUpPageReducer;
