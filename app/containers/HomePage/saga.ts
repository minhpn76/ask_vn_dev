import { takeLatest, call, put } from 'redux-saga/effects';
import ActionTypes from './constants';
import AXIOS_CLIENT, { getHeader } from 'utils/axios';
import { 
  loadTravelMap, loadTravelMapError,
  loadTravelMapSuccess,
  loadFilterMapSuccess,
  loadFilterMapError, loadPaperMap, loadPaperMapError,
  loadPaperMapSuccess, loadPostTop, loadPostTopError,
  loadPostTopSuccess
} from './actions';

// Individual exports for testing
export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(ActionTypes.LOAD_TRAVEL_MAP, getTravelMaps);
  yield takeLatest(ActionTypes.LOAD_FILTER_MAP, getFilterMaps);
  yield takeLatest(ActionTypes.LOAD_PAPER_MAP, getPaperMaps);
  yield takeLatest(ActionTypes.LOAD_POST_TOP, getPostTop);
}

export function* getTravelMaps() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(travelMapsRequest);
    yield put(loadTravelMapSuccess(repos.data));
  } catch (err) {
    yield put(loadTravelMapError());
  }
}

export function* getFilterMaps() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(filterMapsRequest);
    yield put(loadFilterMapSuccess(repos.data));
  } catch (err) {
    yield put(loadFilterMapError());
  }
}

export function* getPaperMaps() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(paperMapsRequest);

    yield put(loadPaperMapSuccess(repos.data));
  } catch (err) {
    yield put(loadPaperMapError());
  }
}

export function* getPostTop() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(postTopRequest);
    yield put(loadPostTopSuccess(repos.data));
  } catch (err) {
    yield put(loadPostTopError());
  }
}

// Axios call API 
function travelMapsRequest() {
  return AXIOS_CLIENT.post('api/map/get_featured_travel_maps', {}, {
    headers: getHeader()
  });
}

function filterMapsRequest() {
  return AXIOS_CLIENT.get('api/map/get_featured_filter', {
    headers: getHeader()
  });
}

function paperMapsRequest() {
  return AXIOS_CLIENT.post('api/map/get_featured_paper_maps', {}, {
    headers: getHeader()
  });
}

function postTopRequest() {
  return AXIOS_CLIENT.get('api/post/top', {
    headers: getHeader()
  });
}

