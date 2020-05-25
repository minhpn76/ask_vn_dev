import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface MapPageState {
  isLoading: boolean,
  travelMaps: TravelMapItemState[],
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

/* --- ACTIONS --- */
type MapPageActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = MapPageState;
type ContainerActions = MapPageActions;

export { RootState, ContainerState, ContainerActions };
