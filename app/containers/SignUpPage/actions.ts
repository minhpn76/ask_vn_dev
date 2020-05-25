/*
 *
 * SignUpPage actions
 *
 */

import { action } from 'typesafe-actions';
import {
    ISignUpPaloadState
} from './types';
import {
    IAccount
} from 'containers/LoginPage/types';

import ActionTypes from './constants';

export const defaultAction = () => action(ActionTypes.DEFAULT_ACTION);
export const postSignUp = (payload: ISignUpPaloadState) => action(ActionTypes.POST_SIGN_UP, payload);
export const postSignUpSuccess = (payload: any) => action(ActionTypes.POST_SIGN_UP_SUCCESS, payload);
export const postSignUpError = (payload: any) => action(ActionTypes.POST_SIGN_UP_ERROR, payload);
export const clearSignUp = () => action(ActionTypes.CLEAR_SIGN_UP);

export const logInFacebook = (payload: string) => action(ActionTypes.LOGIN_FACEBOOK, payload);
export const logInFacebookSuccess = (payload: IAccount) => action(ActionTypes.LOGIN_FACEBOOK_SUCCESS, payload);
export const logInFacebookError = (payload: any) => action(ActionTypes.LOGIN_FACEBOOK_ERROR, payload);

export const logInGoogle = (payload: string) => action(ActionTypes.LOGIN_GOOGLE, payload);
export const logInGoogleSuccess = (payload: IAccount) => action(ActionTypes.LOGIN_GOOGLE_SUCCESS, payload);
export const logInGoogleError = (payload: any) => action(ActionTypes.LOGIN_GOOGLE_ERROR, payload);