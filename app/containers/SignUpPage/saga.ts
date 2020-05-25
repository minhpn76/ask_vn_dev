import { takeLatest, call, put, take, select } from 'redux-saga/effects';
import ActionTypes from './constants';
import AXIOS_CLIENT, { getHeader } from 'utils/axios';
import { AxiosResponse } from 'axios';
import history from 'utils/history';
import { push } from 'connected-react-router';
import {
  makeSelectFullName,
  makeSelectCountry,
  makeSelectEmailSignUp,
  makeSelectPassword,
  makeSelectPasswordConfirm,
  makeSelectAccessToken
} from './selectors';
import {
  postSignUpSuccess,
  postSignUpError,
  logInGoogleSuccess,
  logInFacebookError,
  logInFacebookSuccess,
  logInFacebook,
  logInGoogleError
} from './actions';
import { ISignUpPaloadState, IUser } from './types';
import { IAccount, IPayloadIntergration, loginInPayloadState } from 'containers/LoginPage/types';
import { isEmpty } from 'lodash';

// Individual exports for testing
export default function* signUpPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(ActionTypes.POST_SIGN_UP, signUp);
  yield takeLatest(ActionTypes.LOGIN_FACEBOOK, postLogInFacebook);
  yield takeLatest(ActionTypes.LOGIN_GOOGLE, postLogInGoogle);
}

export function* signUp() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const name: string = yield select(makeSelectFullName());
    const email: string = yield select(makeSelectEmailSignUp());
    const country: string = yield select(makeSelectCountry());
    const password: string = yield select(makeSelectPassword());
    const password_confirmation: string = yield select(
      makeSelectPasswordConfirm(),
    );
    const repos: AxiosResponse<IUser> = yield call(signUpRequest, {
      name: name,
      email: email,
      country: country,
      password: password,
      password_confirmation: password_confirmation,
    });
    yield put(postSignUpSuccess(repos.data));
    if (!isEmpty(repos.data)) {
      const { token } = repos.data;
      localStorage.clear();
      localStorage.setItem('token', token!);
      localStorage.setItem('user_profile', JSON.stringify(repos.data));
      localStorage.setItem('user_name', repos.data.name || '');
      localStorage.setItem('user_email', repos.data.email || '');
      localStorage.setItem('user_avatar', repos.data.avatar || '');
      localStorage.setItem('is_logger', JSON.stringify(true));
      yield put(push('/profile'));
    }
  } catch (err) {
    yield put(postSignUpError(null));
  }
}
export function* postLogInFacebook() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const token: string = yield select(makeSelectAccessToken());
    if (!token) {
      yield put(logInFacebookError(null));
      return;
    }
    const repos: AxiosResponse<IAccount> = yield call(logInFacebookRequest, {
      token: token,
    });
    yield put(logInFacebookSuccess(repos.data));
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
      yield put(push('/profile'));
    }
  } catch (err) {
    yield put(logInFacebookError(err));
  }
}

export function* postLogInGoogle() {
  // Select username from store
  try {
    // Call our request helper (see 'utils/request')
    const token: string = yield select(makeSelectAccessToken());
    if (!token) {
      yield put(logInGoogleError(null));
      return;
    }
    const repos: AxiosResponse<IAccount> = yield call(logInGoogleRequest, {
      token: token,
    });
    yield put(logInGoogleSuccess(repos.data));
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
      yield put(push('/profile'));
    }
  } catch (err) {
    yield put(logInGoogleError(err));
  }
}

function logInRequest(payload: loginInPayloadState) {
  return AXIOS_CLIENT.post('api/login', { ...payload });
}

function logInFacebookRequest(payload: IPayloadIntergration) {
  return AXIOS_CLIENT.post('api/social/facebook/login', {
    ...payload,
  });
}

function logInGoogleRequest(payload: IPayloadIntergration) {
  return AXIOS_CLIENT.post('api/social/google/login', {
    ...payload,
  });
}
function signUpRequest(payload: ISignUpPaloadState) {
  return AXIOS_CLIENT.post(
    'api/register',
    { ...payload },
    {
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
