/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { RouteChildrenProps } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import Navigations from 'components/Navigations/Loadable';
import Header from 'components/Header/Loadable';
import AvailbleMapsElements from 'components/AvailbleMapsElements/Loadable';
import AddressElements from 'components/AddressElements/Loadable';
import IllustratedMapsElements from 'components/IllustratedMapsElements/Loadable';
import TravelGuidesElements from 'components/TravelGuidesElements/Loadable';
import OurCommunity from 'components/OurCommunity/Loadable';
import {
  loadTravelMap,
  loadFilterMap,
  loadPaperMap,
  loadPostTop
} from './actions';

const stateSelector = createStructuredSelector({
  homePage: makeSelectHomePage(),
});


function HomePage(props: RouteChildrenProps<any>) {
  useInjectReducer({ key: 'homePage', reducer: reducer });
  useInjectSaga({ key: 'homePage', saga: saga });

  const { homePage } = useSelector(stateSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    // Init data
    dispatch(loadTravelMap());
    dispatch(loadFilterMap());
    dispatch(loadPaperMap());
    dispatch(loadPostTop());
  }, []);
  const {
    travelMaps, filterMaps, paperMaps, postTops
  } = homePage;

  const changePage = () => {};
  return (
    <div>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <Header />
      <AvailbleMapsElements
        travelMaps={travelMaps}
      />
      <AddressElements
        filterMaps={filterMaps}
      />
      <IllustratedMapsElements
        paperMaps={paperMaps}
      />
      <TravelGuidesElements
        postTops={postTops}
      />
      <OurCommunity/>
      <Navigations {...props} />
    </div>
  );
}

export default memo(HomePage);
