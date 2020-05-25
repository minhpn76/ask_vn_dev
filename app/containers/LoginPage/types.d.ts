import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface LoginPageState {
  isLoading: boolean,
  email?: string,
  name?: string,
  avatar?: string,
  password?: string,
  isLoggedIn: boolean,
  validationErrors? : any,
  account?: IAccount,
  token?: string
}

export interface IAccount {
  token?: string | undefined;
  user?: IUser;
  s3BaseUrl?: string
}

export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  email_verified_at?: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
  country?: string;
  is_admin: number;
}

export interface IPayloadIntergration {
  token: string;
}
export interface loginInPayloadState {
  email: string;
  password: string
}

/* --- ACTIONS --- */
type LoginPageActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = LoginPageState;
type ContainerActions = LoginPageActions;

export { RootState, ContainerState, ContainerActions };
