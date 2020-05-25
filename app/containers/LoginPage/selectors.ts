import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = (state: ApplicationRootState) => {
  return state.loginPage || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(
    selectLoginPageDomain,
    substate => {
      return substate;
    },
  );

const makeSelectIsLoggedIn = () =>
  createSelector(
    selectLoginPageDomain,
    substate => {
      return substate.isLoggedIn;
    },
  );

const makeSelectName = () =>
  createSelector(
    selectLoginPageDomain,
    substate => {
      return substate.name;
    },
  );

const makeSelectAvatar = () =>
  createSelector(
    selectLoginPageDomain,
    substate => {
      return substate.avatar;
    },
  );
const makeSelectEmail = () =>
  createSelector(
    selectLoginPageDomain,
    substate => {
      return substate.email;
    },
  );

const makeSelectPassword = () =>
  createSelector(
    selectLoginPageDomain,
    substate => {
      return substate.password;
    },
  );

const makeSelectAccessToken = () =>
  createSelector(
    selectLoginPageDomain,
    substate => {
      return substate.token;
    },
  );

export default makeSelectLoginPage;
export {
  selectLoginPageDomain,
  makeSelectIsLoggedIn,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectName,
  makeSelectAvatar,
  makeSelectAccessToken
};
