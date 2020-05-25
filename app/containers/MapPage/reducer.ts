/*
 *
 * MapPage reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  isLoading: false,
  travelMaps: []
};

function mapPageReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.LOAD_TRAVEL_MAPS:
      return {
        ...state,
        isLoading: true,
        travelMaps: []
      };
    case ActionTypes.LOAD_TRAVEL_MAPS_ERROR:
      return {
        ...state,
        isLoading: false,
        travelMaps: []
      };
    case ActionTypes.LOAD_TRAVEL_MAPS_SUCCESS:
      return {
        ...state,
        isLoading: true,
        travelMaps: action.payload
      }; 
    default:
      return state;
  }
}

export default mapPageReducer;
