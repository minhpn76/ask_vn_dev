/*
 *
 * ProfilePage actions
 *
 */

import { action } from 'typesafe-actions';
import {} from './types';

import ActionTypes from './constants';

export const defaultAction = () => action(ActionTypes.DEFAULT_ACTION);
export const loadCheckInLocationRequest = (type: number) => action(ActionTypes.CHECK_IN_LOCATION_REQUEST, type);
export const loadCheckInLocationSuccess = (payload: any) => action(ActionTypes.CHECK_IN_LOCATION_SUCCESS, payload);
export const loadCheckInLocationFail = () => action(ActionTypes.CHECK_IN_LOCATION_ERROR);

export const loadPointRequest = () => action(ActionTypes.POINTS_REQUEST);
export const loadPointSuccess = (payload: any) => action(ActionTypes.POINTS_SUCCESS, payload);
export const loadPointFail = () => action(ActionTypes.POINTS_ERROR);