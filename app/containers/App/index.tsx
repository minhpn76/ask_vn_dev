/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import MapPage from 'containers/MapPage/Loadable';
import MapDetailPage from 'containers/MapDetailPage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      {/* <BrowserRouter> */}
      <Switch>
        <Route exact path="/"
          render={(props) => <HomePage {...props} />}
        />
        <Route exact path="/login" 
          render={(props) => <LoginPage {...props} />}
        />
        <Route exact path="/maps"
          render={(props) => <MapPage {...props} />}
        />
        <Route exact path="/maps/:id"
          render={(props) => <MapDetailPage {...props} />}
        />
        <Route exact path="/booking" component={HomePage} />
        <Route exact path="/profile" 
          render={(props) => <ProfilePage {...props} />}
        />
        <Route exact path="/signup" 
          render={(props) => <SignUpPage {...props} />}
        />
        <Route component={NotFoundPage} />
      </Switch>
      {/* </BrowserRouter> */}
      <GlobalStyle />
    </div>
  );
}
