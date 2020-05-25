import { takeLatest, call, put } from 'redux-saga/effects';
import ActionTypes from './constants';
import AXIOS_CLIENT, { getHeader } from 'utils/axios';
import { 
  loadTravelMaps,
  loadTravelMapsSuccess,
  loadTravelMapsError
} from './actions';

export default function* mapPageSaga() {
  yield takeLatest(ActionTypes.LOAD_TRAVEL_MAPS, getTravelMaps);
}

export function* getTravelMaps() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(travelMapsRequest);
    yield put(loadTravelMapsSuccess(repos.data));
  } catch (err) {
    yield put(loadTravelMapsError());
  }
}

// Axios call API 
function travelMapsRequest() {
  return AXIOS_CLIENT.get('api/map/get_travel_maps', {
    headers: getHeader()
  });
}
