/*
 *
 * HomePage reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  isLoading: false,
  travelMaps: [],
  filterMaps: [],
  paperMaps: [],
  postTops: []
};

function homePageReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.LOAD_TRAVEL_MAP:
      return {
        ...state,
        isLoading: true,
        travelMaps: []
      };
    case ActionTypes.LOAD_TRAVEL_MAP_ERROR:
      return {
        ...state,
        isLoading: false,
        travelMaps: []
      };
    case ActionTypes.LOAD_TRAVEL_MAP_SUCCESS:
      return {
        ...state,
        isLoading: true,
        travelMaps: action.payload
      }; 
    case ActionTypes.LOAD_FILTER_MAP:
      return {
        ...state,
        isLoading: true,
        filterMaps: []
      };
    case ActionTypes.LOAD_FILTER_MAP_ERROR:
      return {
        ...state,
        isLoading: false,
        filterMaps: []
      };
    case ActionTypes.LOAD_FILTER_MAP_SUCCESS:
      return {
        ...state,
        isLoading: true,
        filterMaps: action.payload
      }; 
    case ActionTypes.LOAD_PAPER_MAP:
      return {
        ...state,
        isLoading: true,
        paperMaps: []
      };
    case ActionTypes.LOAD_PAPER_MAP_ERROR:
      return {
        ...state,
        isLoading: false,
        paperMaps: []
      };
    case ActionTypes.LOAD_PAPER_MAP_SUCCESS:
      return {
        ...state,
        isLoading: true,
        paperMaps: action.payload
      }; 
    case ActionTypes.LOAD_POST_TOP:
      return {
        ...state,
        isLoading: true,
        postTops: []
      };
    case ActionTypes.LOAD_POST_TOP_ERROR:
      return {
        ...state,
        isLoading: false,
        postTops: []
      };
    case ActionTypes.LOAD_POST_TOP_SUCCESS:
      return {
        ...state,
        isLoading: true,
        postTops: action.payload
      }; 
    default:
      return state;
  }
}

export default homePageReducer;
