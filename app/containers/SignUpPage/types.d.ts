import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface SignUpPageState {
  isLoading: boolean,
  name?: string,
  email?: string,
  country?: string,
  avatar?: string,
  password?: string,
  password_confirmation?: string,
  isSignUp?: boolean,
  validationErrors? : any,
  token?: string,
  account?: IUser
}

export interface ISignUpPaloadState {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  country: string;
}

export interface IUser {
  token?: string;
  user_id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  country_avatar?: string;
}
/* --- ACTIONS --- */
type SignUpPageActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = SignUpPageState;
type ContainerActions = SignUpPageActions;

export { RootState, ContainerState, ContainerActions };
