/*
 *
 * ProfilePage
 *
 */

import React, { memo } from 'react';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { RouteChildrenProps, Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './profile.scss';
import { isUndefined } from 'lodash';
import {
  Button
} from '@material-ui/core';

import Navigations from 'components/Navigations/Loadable';
import CheckListAccount from 'components/CheckListAccount/Loadable';
import HeaderProfilePage from 'components/HeaderProfilePage/Loadable';
import PopularOnProfile from 'components/PopularOnProfile/Loadable';
import TopUpMessage from 'components/TopUpMessage/Loadable';
import {
  makeSelectIsLoggedIn,
  makeSelectName,
  makeSelectEmail,
  makeSelectAvatar,
} from 'containers/LoginPage/selectors';
import {
  makeSelectEmailSignUp,
  makeSelectFullName,
  makeSelectIsSignUp,
  makeSelectAvatarSignUp,
} from 'containers/SignUpPage/selectors';
import makeSelectHomePage from 'containers/HomePage/selectors';

import { loadCheckInLocationRequest, loadPointRequest } from './actions';
import { loadPostTop } from 'containers/HomePage/actions';

interface Props {}
const stateSelector = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
  isLoginIn: makeSelectIsLoggedIn(),
  isSignUp: makeSelectIsSignUp(),
  emailSignUp: makeSelectEmailSignUp(),
  emailLogin: makeSelectEmail(),
  nameSignUp: makeSelectFullName(),
  nameLogin: makeSelectName(),
  avatarLogin: makeSelectAvatar(),
  avatarSignUp: makeSelectAvatarSignUp(),
  homePage: makeSelectHomePage(),
});

function ProfilePage(props: RouteChildrenProps<any>) {
  // Warning: Add your key to RootState in types/index.d.ts file
  useInjectReducer({ key: 'profilePage', reducer: reducer });
  useInjectSaga({ key: 'profilePage', saga: saga });
  const {
    profilePage,
    homePage,
    isSignUp, 
    isLoginIn
  } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const [isLoginOrSignUp, setIsLoginOrSignUp] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  // topup messages
  const [openMessage, setOpenMessage] = React.useState(false);
  const handleOpenMessage = () => {
    setOpenMessage(true);
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
  };
  // end messages

  React.useEffect(() => {
    // Init data
    const isLoggerLocal = localStorage.getItem('is_logger');
    const isLogger = isLoggerLocal != null ? JSON.parse(isLoggerLocal) : null;
    const userName = localStorage.getItem('user_name');
    const userEmail = localStorage.getItem('user_email');
    const userAvatar = localStorage.getItem('user_avatar');
    
    setIsLoginOrSignUp(isLogger || false);
    setUserName(userName || '');
    setUserEmail(userEmail || '');
    setUserAvatar(userAvatar || '');
    if (isLogger) {
      dispatch(loadCheckInLocationRequest(0));
      dispatch(loadPointRequest());
    }
  }, [isLoginIn, isSignUp]);

  const { postTops } = homePage;
  const { checkInLocation, points } = profilePage;
  const filterCheckIn = (type: number) => {
    dispatch(loadCheckInLocationRequest(type));
  };
  return (
    <div>
      <Helmet>
        <title>ProfilePage</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      <HeaderProfilePage
        isLogger={isLoginOrSignUp}
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
        points={points}
      ></HeaderProfilePage>
      <CheckListAccount
        isLogger={isLoginOrSignUp}
        checkListLocation={checkInLocation}
        filterCheckIn={filterCheckIn}
      ></CheckListAccount>
      <PopularOnProfile popularAsk={postTops}></PopularOnProfile>
      {/* topup messages */}
      {/* <Button onClick={handleOpenMessage}>Messages</Button>
      <TopUpMessage
        openMessage={openMessage}
        handleCloseMessage={handleCloseMessage}
        userName="Vu Le Bao Ngoc"
        point="31"
      ></TopUpMessage> */}
      {/* end messages */}
      
      <Navigations {...props} />
    </div>
  );
}

export default memo(ProfilePage);
