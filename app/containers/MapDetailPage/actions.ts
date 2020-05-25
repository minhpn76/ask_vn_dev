/*
 *
 * MapDetailPage actions
 *
 */

import {action} from 'typesafe-actions';
import {MapLocationResponse, MapFilterResponse, MapLocationAction, Location, ILocationAroundMe} from './types';

import ActionTypes from './constants';

export const getFilterTravel = (map_id: number) => action(ActionTypes.LOAD_FILTER, map_id);
export const getFilterMapSuccess = (filters: MapFilterResponse[]) => action(ActionTypes.GET_FILTER_SUCCESS, filters);
export const getLocationMapSuccess = (locations: MapLocationAction[]) => action(ActionTypes.GET_FILTER_LOCATION, locations);
export const setFilter = (filter: MapFilterResponse) => action(ActionTypes.SET_FILTER, filter);
export const setLocation = (location: MapLocationResponse) => action(ActionTypes.SET_LOCATION, location);
export const setUserLocation = (location: Location) => action(ActionTypes.GET_USER_LOCATION, location);
export const getCheckInLocation = (location: MapLocationResponse[]) => action(ActionTypes.GET_CHECK_IN_LOCATION, location);
export const checkInLocation = () => action(ActionTypes.CHECK_IN_LOCATION);
export const aroundLocation = (location: any) => action(ActionTypes.AROUND_LOCATION, location);
export const searchLocation = (inputSearch: string) => action(ActionTypes.SEARCH_LOCATION, inputSearch);
export const searchLocationSuccess = (location: ILocationAroundMe[]) => action(ActionTypes.SEARCH_LOCATION_SUCCESS, location);
export const clickLike = () => action(ActionTypes.CLICK_LIKE);
export const closeLocation = (location: Location) => action(ActionTypes.CLOSE_LOCATION, location);
export const closeLocationSuccess = (location: any) => action(ActionTypes.CLOSE_LOCATION_SUCCESS, location);

