import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import AXIOS_CLIENT, { getHeader } from 'utils/axios';
import ActionTypes from './constants';
import {
  loadCheckInLocationSuccess, loadCheckInLocationFail,
  loadPointSuccess, loadPointFail
} from './actions';
import {
  makeSelectTypeCheckIn
} from './selectors';

// Individual exports for testing
export default function* profilePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(ActionTypes.CHECK_IN_LOCATION_REQUEST, getCheckInLocation);
  yield takeLatest(ActionTypes.POINTS_REQUEST, getPoint);
}


export function* getCheckInLocation() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const typeCheckIn: number = yield select(
      makeSelectTypeCheckIn(),
    );
    const repos = yield call(checkInLocationRequest, typeCheckIn);
    yield put(loadCheckInLocationSuccess(repos.data));
  } catch (err) {
    yield put(loadCheckInLocationFail());
  }
}

export function* getPoint() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(getPointRequest);
    yield put(loadPointSuccess(repos.data));
  } catch (err) {
    yield put(loadPointFail());
  }
}


function checkInLocationRequest(typeCheckIn: number) {
  return AXIOS_CLIENT.get(`api/user/checkedin_locations?type=${typeCheckIn}`, {
    headers: getHeader()
  });
}

function getPointRequest() {
  return AXIOS_CLIENT.get('api/user/points', {
    headers: getHeader()
  });
}