/*
 *
 * LoginPage actions
 *
 */

import { action } from 'typesafe-actions';
import {
    loginInPayloadState, IAccount
} from './types';

import ActionTypes from './constants';

export const logIn = (payload: loginInPayloadState) => action(ActionTypes.POST_LOGIN, payload);
export const loginSuccess = (payload: any) => action(ActionTypes.POST_LOGIN_SUCCESS, payload);
export const loginError = (payload: any) => action(ActionTypes.POST_LOGIN_ERROR, payload);
export const clearLogin = () => action(ActionTypes.CLEAR_LOGIN);
