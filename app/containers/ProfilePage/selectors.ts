import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the profilePage state domain
 */

const selectProfilePageDomain = (state: ApplicationRootState) => {
  return state.profilePage || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProfilePage
 */

const makeSelectProfilePage = () =>
  createSelector(
    selectProfilePageDomain,
    substate => {
      return substate;
    },
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectProfilePageDomain,
    substate => {
      return substate.isLoading;
    },
  );

const makeSelectTypeCheckIn = () =>
  createSelector(
    selectProfilePageDomain,
    substate => {
      return substate.type_checkin;
    },
  );

export default makeSelectProfilePage;
export { selectProfilePageDomain, makeSelectIsLoading, makeSelectTypeCheckIn };
