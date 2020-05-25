/*
 *
 * ProfilePage reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';


export const initialState: ContainerState = {
  isLoading: false,
  checkInLocation: [],
  points: {
    points: 0,
    histories: []
  },
  type_checkin: 0
};

function profilePageReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.CHECK_IN_LOCATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        checkInLocation: [],
        type_checkin: action.payload
      };
    case ActionTypes.CHECK_IN_LOCATION_SUCCESS:
      return {
        ...state,
        isLoading: true,
        checkInLocation: action.payload
      };
    case ActionTypes.CHECK_IN_LOCATION_ERROR:
      return {
        ...state,
        isLoading: false,
        checkInLocation: []
      };
    case ActionTypes.POINTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        points: {
          points: 0,
          histories: []
        }
      };
    case ActionTypes.POINTS_SUCCESS:
      return {
        ...state,
        isLoading: true,
        points: {
          points: action.payload.points,
          histories: action.payload.histories
        }
      };
    case ActionTypes.POINTS_ERROR:
      return {
        ...state,
        isLoading: false,
        points: {
          points: 0,
          histories: []
        }
      };
    default:
      return state;
  }
}

export default profilePageReducer;
