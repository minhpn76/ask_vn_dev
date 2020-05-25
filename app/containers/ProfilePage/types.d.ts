import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface ProfilePageState {
  isLoading: boolean;
  checkInLocation: ICheckInLocation[];
  points: IPointsResponse;
  type_checkin: number
}

export interface ICheckInLocation {
  id: number | null;
  location_name: string;
  map_id: number | null;
  tags: string;
  latitude: number
  longitude: number;
  created_at: string | null;
  updated_at: string | null;
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
  price_range_type: number;
  contact_info: string;
  business_time: string;
  landmark_image: string | null;
  password: string | null;
  filter_images?: IFilterImageResponse;
  pivot?: IPivotResponse;
}

export interface IPointsResponse {
  points: number;
  histories: IPoinHistory[];
}

export interface IPoinHistory {
  id: number | null;
  user_id: number;
  points: number;
  point_grant_type: string;
  point_grant_id: number;
  granted_at: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface IFilterImageResponse{
  id: number | null;
  map_id: number | null;
  name: string;
  icon: string;
  pin: string;
  created_at: string | null;
  updated_at: string | null;
  travel_id: string;
  is_landmark: number
}
export interface IPivotResponse {
  user_id: number | null;
  location_id: number
}

/* --- ACTIONS --- */
type ProfilePageActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = ProfilePageState;
type ContainerActions = ProfilePageActions;

export { RootState, ContainerState, ContainerActions };
