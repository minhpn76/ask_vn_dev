import {ActionType} from 'typesafe-actions';
import * as actions from './actions';
import {ApplicationRootState} from 'types';

/**
 * Filter data
 */
export interface MapFilterResponse {
  id: number;
  map_id: number;
  name: string;
  icon: string;
  pin: string;
  travel_id: string;
  is_landmark: number;
  locations?: MapLocationResponse[];
}

export interface MapLocationImage {
  id: number;
  location_id: number;
  url: string;
}

export interface MapLocationAction {
  locationRepos: MapLocationResponse[];
  filterId: number;
}

export interface MapLocationResponse {
  id: number;
  location_name: string;
  map_id: number | null;
  tags: string | null;
  latitude: number;
  longitude: number;
  travelmap_id: number;
  filter_id: number;
  description: string;
  website: string;
  image: string;
  address: string;
  reward_point: number;
  price_range: string;
  rate_authentic: number;
  rate_cleaness: number;
  rate_decoration: number;
  rate_friendliness: number;
  rate_reasonable: number;
  price_range_type: number | null;
  contact_info: string | null;
  business_time: BussinessTime[] | null;
  landmark_image: string | null;
  images: MapLocationImage[];
  likes?: number;
  filter_images?: IFilterImage
}

export interface BussinessTime {
  start: string;
  end: string;
  is_open: boolean;
  is_today: boolean;
  is_allday: boolean;
  day_text: string;
  day: number;
}

export interface ILocationAroundMe {
  id: number;
  location_name: string;
  map_id: number | null;
  tags: string | null;
  latitude: number;
  longitude: number;
  travelmap_id: number;
  filter_id: number;
  description: string;
  distance: number;
  filter_images: IFilterImage;
  distance_text?: string;
  reward_point?: number
}

export interface IFilterImage {
  id: number;
  map_id: number | null;
  name: string;
  icon: string;
  pin: string;
  created_at: string | null;
  updated_at: string | null;
  travel_id: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

/* --- STATE --- */
interface MapDetailPageState {
  mapId: number | null;
  isLoading: boolean;
  isShowAll: boolean;
  hasLocation: boolean;
  filters: MapFilterResponse[];
  selectedFilter: MapFilterResponse;
  selectedLocation: MapLocationResponse;
  userLocation: Location;
  locationCheckIn: MapLocationResponse[];
  locationAround: ILocationAroundMe[];
  inputSearch: string | null;
  locationSearched: ILocationAroundMe[]
  locationClosed?: Location
}

/* --- ACTIONS --- */
type MapDetailPageActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = MapDetailPageState;
type ContainerActions = MapDetailPageActions;

export {RootState, ContainerState, ContainerActions};
