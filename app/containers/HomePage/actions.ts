/*
 *
 * HomePage actions
 *
 */

import { action } from 'typesafe-actions';
import { 
    TravelMapsResponse, ContainerState,
    FilterMapsResponse, PaperMapsResponse,
    PostTopResponse
 } from './types';

import ActionTypes from './constants';

export const defaultAction = () => action(ActionTypes.DEFAULT_ACTION);
export const loadTravelMap = () => action(ActionTypes.LOAD_TRAVEL_MAP);
export const loadTravelMapSuccess = (payload: any) => action(ActionTypes.LOAD_TRAVEL_MAP_SUCCESS, payload);
export const loadTravelMapError = () => action(ActionTypes.LOAD_TRAVEL_MAP_ERROR);

export const loadFilterMap = () => action(ActionTypes.LOAD_FILTER_MAP);
export const loadFilterMapSuccess = (payload: any) => action(ActionTypes.LOAD_FILTER_MAP_SUCCESS, payload);
export const loadFilterMapError = () => action(ActionTypes.LOAD_FILTER_MAP_ERROR);

export const loadPaperMap = () => action(ActionTypes.LOAD_PAPER_MAP);
export const loadPaperMapSuccess = (payload: any) => action(ActionTypes.LOAD_PAPER_MAP_SUCCESS, payload);
export const loadPaperMapError = () => action(ActionTypes.LOAD_PAPER_MAP_ERROR);

export const loadPostTop = () => action(ActionTypes.LOAD_POST_TOP);
export const loadPostTopSuccess = (payload: any) => action(ActionTypes.LOAD_POST_TOP_SUCCESS, payload);
export const loadPostTopError = () => action(ActionTypes.LOAD_POST_TOP_ERROR);