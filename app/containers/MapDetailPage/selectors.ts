import {createSelector} from 'reselect';
import {ApplicationRootState} from 'types';
import {initialState} from './reducer';
import {MapFilterResponse} from "./types";

/**
 * Direct selector to the mapDetailPage state domain
 */

const selectMapDetailPageDomain = (state: ApplicationRootState) => {
  return state.mapDetailPage || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by MapDetailPage
 */

const makeSelectMapDetailPage = () =>
  createSelector(
    selectMapDetailPageDomain,
    substate => {
      return substate;
    },
  );


const makeSelectMapId = () =>
  createSelector(
    selectMapDetailPageDomain,
    substate => {
      return substate.mapId;
    },
  );

const makeSelectLocation = () =>
  createSelector(
    selectMapDetailPageDomain,
    substate => {
      return substate.userLocation;
    },
  );

const makeSelectSelectedLocation = () =>
  createSelector(
    selectMapDetailPageDomain,
    substate => {
      return substate.selectedLocation;
    },
  );

const makeSelectLocationAround = () =>
  createSelector(
    selectMapDetailPageDomain,
    substate => {
      return substate.locationAround;
    },
  );

const makeSelectInputSearch = () =>
  createSelector(
    selectMapDetailPageDomain,
    substate => {
      return substate.inputSearch;
    },
  );

const makeSelectLocationSearched = () =>
  createSelector(
    selectMapDetailPageDomain,
    substate => {
      return substate.locationSearched;
    },
  );
const makeSelectMapFilters = () =>
  createSelector(
    selectMapDetailPageDomain,
    substate => {
      return substate.filters;
    },
  );

const makeSelectLocationClosed = () =>
  createSelector(
    selectMapDetailPageDomain,
    substate => {
      return substate.locationClosed;
    },
  );

export default makeSelectMapDetailPage;
export {
  selectMapDetailPageDomain,
  makeSelectMapId,
  makeSelectLocation,
  makeSelectSelectedLocation,
  makeSelectLocationAround,
  makeSelectInputSearch,
  makeSelectLocationSearched,
  makeSelectLocationClosed,
  makeSelectMapFilters
};
