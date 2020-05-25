/*
 *
 * MapPage actions
 *
 */

import { action } from 'typesafe-actions';
import {} from './types';

import ActionTypes from './constants';

export const loadTravelMaps = () => action(ActionTypes.LOAD_TRAVEL_MAPS);
export const loadTravelMapsSuccess = (payload: any) => action(ActionTypes.LOAD_TRAVEL_MAPS_SUCCESS, payload);
export const loadTravelMapsError = () => action(ActionTypes.LOAD_TRAVEL_MAPS_ERROR);
