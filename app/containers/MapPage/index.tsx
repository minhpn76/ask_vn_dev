/*
 *
 * MapPage
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Navigations from 'components/Navigations/Loadable';
import HeaderMapPage from 'components/HeaderMapPage/Loadable';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMapPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import MapsElements from 'components/MapsElements/Loadable';
import {
  loadTravelMaps
} from './actions';

const stateSelector = createStructuredSelector({
  mapPage: makeSelectMapPage(),
});

interface Props {}

function MapPage(props: Props) {
  // Warning: Add your key to RootState in types/index.d.ts file
  useInjectReducer({ key: 'mapPage', reducer: reducer });
  useInjectSaga({ key: 'mapPage', saga: saga });

  const { mapPage } = useSelector(stateSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    // Init data
    dispatch(loadTravelMaps());
  }, []);
  const { travelMaps } = mapPage;
  const [inputSearch, setInputSearch] = React.useState('');
  const searchLocation = () => {

  };
  return (
    <div>
      <Helmet>
        <title>MapPage</title>
        <meta name="description" content="Description of MapPage" />
      </Helmet>
      <HeaderMapPage 
        inputSearch={inputSearch}
        setInputSearch={setInputSearch}
        searchLocation={searchLocation}
      />
      <MapsElements travelMaps={travelMaps}/>
      <Navigations {...props} />
    </div>
  );
}

export default memo(MapPage);
