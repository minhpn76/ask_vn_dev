import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = (state: ApplicationRootState) => {
  return state.homePage || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => {
      return substate;
    },
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectHomePageDomain,
    substate => {
      return substate.isLoading;
    },
  );

const makeSelectTravelMaps = () =>
  createSelector(
    selectHomePageDomain,
    substate => {
      return substate.travelMaps;
    },
  );

const makeSelectFilterMaps = () =>
  createSelector(
    selectHomePageDomain,
    substate => {
      return substate.filterMaps;
    },
  );

export default makeSelectHomePage;
export { 
  selectHomePageDomain, makeSelectIsLoading, 
  makeSelectTravelMaps, makeSelectFilterMaps
};
