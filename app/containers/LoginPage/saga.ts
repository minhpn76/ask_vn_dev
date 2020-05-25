import {takeLatest, call, put, take, fork, select} from 'redux-saga/effects';
import ActionTypes from './constants';
import history from 'utils/history';
import {AxiosResponse} from 'axios';
import {makeSelectEmail, makeSelectPassword, makeSelectAccessToken} from "./selectors";
import AXIOS_CLIENT, {getHeader} from 'utils/axios';
import {
  loginSuccess, loginError
} from './actions';
import {push} from 'connected-react-router';
import {
  loginInPayloadState,
  IAccount,
  IPayloadIntergration
} from './types';
import {isEmpty} from 'lodash';

// Individual exports for testing
export default function* loginPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(ActionTypes.POST_LOGIN, postLogin);
}

export function* postLogin() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const email: string = yield select(makeSelectEmail());
    const password: string = yield select(makeSelectPassword());
    const repos: AxiosResponse<IAccount> = yield call(logInRequest, {
      email: email,
      password: password
    });
    yield put(loginSuccess(repos.data));
    if (!isEmpty(repos.data)) {
      const { token } = repos.data;
      localStorage.clear();
      localStorage.setItem('token', token!);
      localStorage.setItem('user_profile', JSON.stringify(repos.data));
      const tempUserProfile = repos.data ? repos.data : null;
      const userObj = tempUserProfile ? tempUserProfile.user : null;
      const user_name = userObj ? userObj.name : '';
      const user_email = userObj ? userObj.email : '';
      const user_avatar = userObj ? userObj.avatar : '';
      localStorage.setItem('user_name', user_name || '');
      localStorage.setItem('user_email', user_email || '');
      localStorage.setItem('user_avatar', user_avatar || '');
      localStorage.setItem('is_logger', JSON.stringify(true));
      yield put((push('/profile')));
    }
  } catch (err) {
    yield put(loginError(err));
  }
}

function logInRequest(payload: loginInPayloadState) {
  return AXIOS_CLIENT.post('api/login',
    {...payload});
}