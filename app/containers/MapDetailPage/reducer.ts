/*
 *
 * MapDetailPage reducer
 *
 */

import ActionTypes from './constants';
import {ContainerActions, ContainerState, MapLocationResponse} from './types';
import {clone, find, isUndefined, slice} from "lodash";

export const initialState: ContainerState = {
  isLoading: false,
  isShowAll: false,
  hasLocation: false,
  mapId: null,
  inputSearch: null,
  locationSearched: [],
  filters: [],
  locationCheckIn: [],
  locationAround: [],
  selectedLocation: {
    location_name: '',
    longitude: 106.693126,
    latitude: 10.771344,
    website: '',
    tags: null,
    reward_point: 0,
    travelmap_id: 0,
    rate_reasonable: 0,
    rate_friendliness: 0,
    rate_decoration: 0,
    rate_cleaness: 0,
    rate_authentic: 0,
    price_range_type: null,
    price_range: '',
    map_id: 0,
    landmark_image: null,
    images: [],
    image: '',
    filter_id: 0,
    description: '',
    contact_info: '',
    business_time: null,
    address: '',
    id: 0
  },
  selectedFilter: {
    id: 0,
    name: '',
    icon: '',
    is_landmark: 0,
    travel_id: '',
    map_id: 0,
    pin: ''
  },
  userLocation: {
    longitude: 106.693126,
    latitude: 10.771344,
  },
  locationClosed: {
    longitude: 0,
    latitude: 0,
  }
};

function mapDetailPageReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.LOAD_FILTER:
      return {
        isLoading: true,
        isShowAll: false,
        hasLocation: false,
        mapId: action.payload,
        filters: [],
        locationCheckIn: [],
        locationAround: [],
        locationSearched: [],
        inputSearch: null,
        selectedLocation: {
          location_name: '',
          longitude: 106.693126,
          latitude: 10.771344,
          website: '',
          tags: null,
          reward_point: 0,
          travelmap_id: 0,
          rate_reasonable: 0,
          rate_friendliness: 0,
          rate_decoration: 0,
          rate_cleaness: 0,
          rate_authentic: 0,
          price_range_type: null,
          price_range: '',
          map_id: 0,
          landmark_image: null,
          images: [],
          image: '',
          filter_id: 0,
          description: '',
          contact_info: '',
          business_time: null,
          address: '',
          id: 0
        },
        selectedFilter: {
          id: 0,
          name: '',
          icon: '',
          is_landmark: 0,
          travel_id: '',
          map_id: 0,
          pin: ''
        },
        userLocation: {
          longitude: 106.693126,
          latitude: 10.771344,
        }
      };
    case ActionTypes.GET_FILTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        filters: action.payload,
      };
    case ActionTypes.GET_FILTER_LOCATION:
      const {filters: filterData} = state;
      const newFilters = filterData.map((value) => {
        const location = find(action.payload, ['filterId', value.id]);
        if (!isUndefined(location)) {
          return {
            ...value,
            locations: location.locationRepos
          };
        }
        return {
          ...value,
        };
      });
      return {
        ...state,
        filters: newFilters
      };
    case ActionTypes.SET_FILTER:
      const {selectedLocation: defaultLocation} = state;
      let newLocation: MapLocationResponse;
      newLocation = defaultLocation;
      if (action.payload.locations && action.payload.locations[0]) {
        newLocation = clone(action.payload.locations[0]);
        newLocation.id = 0;
      }
      return {
        ...state,
        selectedFilter: action.payload,
        selectedLocation: newLocation
      };
    case ActionTypes.SET_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload
      };
    case ActionTypes.GET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
        hasLocation: true
      };
    case ActionTypes.GET_CHECK_IN_LOCATION:
      return {
        ...state,
        locationCheckIn: action.payload
      };
    case ActionTypes.AROUND_LOCATION:
      return {
        ...state,
        locationAround: action.payload
      };
    case ActionTypes.SEARCH_LOCATION:
      return {
        ...state,
        inputSearch: action.payload
      };
    case ActionTypes.SEARCH_LOCATION_SUCCESS:
      return {
        ...state,
        locationSearched: action.payload
      };
    case ActionTypes.CLOSE_LOCATION:
      return {
        ...state,
        locationClosed: action.payload
      };
    case ActionTypes.CLOSE_LOCATION_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}

export default mapDetailPageReducer;
