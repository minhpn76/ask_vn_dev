import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface HomePageState {
  isLoading: boolean,
  travelMaps: TravelMapItemState[],
  filterMaps: FilterMapItemState[],
  paperMaps: PaperMapItemState[],
  postTops: PostTopItemState[],
}
export interface TravelMapItemState {
  id: number;
  name: string;
  icon: string;
  pin: string;
  created_at?: string;
  updated_at?: string;  
  latitude: number;
  longitude: number;
}
export interface FilterMapItemState {
  id: number;
  map_id: number;
  name: string;
  icon: string;
  pin: string;
  created_at?: string;  
  updated_at?: string;
  travel_id: string;
}

export interface PaperMapItemState {
  id: number;
  map_id: number;
  name: string;
  icon: string;
  pin: string;
  created_at?: string;  
  updated_at?: string;
  travel_id: string;
}

export interface PostTopItemState {
  title: string;
  link: string;
  image: string
}
export interface TravelMapsResponse {
  travelMaps: TravelMapItemState[]
}
export interface FilterMapsResponse {
  filterMaps: FilterMapItemState[]
}
export interface PaperMapsResponse {
  paperMaps: PaperMapItemState[]
}
export interface PostTopResponse {
  postTops: PostTopItemState[]
}

/* --- ACTIONS --- */
type HomePageActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = HomePageState;
type ContainerActions = HomePageActions;

export { RootState, ContainerState, ContainerActions };
