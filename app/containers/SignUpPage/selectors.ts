import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the signUpPage state domain
 */

const selectSignUpPageDomain = (state: ApplicationRootState) => {
  return state.signUpPage || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by SignUpPage
 */

const makeSelectSignUpPage = () =>
  createSelector(
    selectSignUpPageDomain,
    substate => {
      return substate;
    },
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectSignUpPageDomain,
    substate => {
      return substate.isLoading;
    },
  );

const makeSelectIsSignUp = () =>
  createSelector(
    selectSignUpPageDomain,
    substate => {
      return substate.isSignUp;
    },
  );

const makeSelectFullName = () =>
  createSelector(
    selectSignUpPageDomain,
    substate => {
      return substate.name;
    },
  );

const makeSelectEmailSignUp = () =>
  createSelector(
    selectSignUpPageDomain,
    substate => {
      return substate.email;
    },
  );

const makeSelectCountry = () =>
  createSelector(
    selectSignUpPageDomain,
    substate => {
      return substate.country;
    },
  );

const makeSelectPassword = () =>
  createSelector(
    selectSignUpPageDomain,
    substate => {
      return substate.password;
    },
  );

const makeSelectAvatarSignUp = () =>
  createSelector(
    selectSignUpPageDomain,
    substate => {
      return substate.avatar;
    },
  );
  

const makeSelectPasswordConfirm = () =>
  createSelector(
    selectSignUpPageDomain,
    substate => {
      return substate.password_confirmation;
    },
  );

const makeSelectAccessToken = () =>
  createSelector(
    selectSignUpPageDomain,
    substate => {
      return substate.token;
    },
  );

export default makeSelectSignUpPage;
export {
  selectSignUpPageDomain,
  makeSelectIsLoading,
  makeSelectFullName,
  makeSelectEmailSignUp,
  makeSelectCountry,
  makeSelectPassword,
  makeSelectPasswordConfirm,
  makeSelectIsSignUp,
  makeSelectAvatarSignUp,
  makeSelectAccessToken
};
