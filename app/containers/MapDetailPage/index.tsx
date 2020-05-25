/*
 *
 * MapDetailPage
 *
 */

import React, {memo, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import makeSelectMapDetailPage, {makeSelectLocationAround, makeSelectLocationSearched} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {Helmet} from 'react-helmet';
import Navigations from 'components/Navigations/Loadable';
import {RouteChildrenProps} from 'react-router-dom';
import GoogleMap from 'components/GoogleMap/Loadable';
import {Container} from '@material-ui/core';
import SearchPlace from 'components/SearchPlace/Loadable';
import './mapDetail.scss';
import MapFilter from 'components/MapFilter/Loadable';
import {
  checkInLocation,
  clickLike,
  getFilterTravel,
  searchLocation,
  setFilter,
  setLocation,
  setUserLocation,
  closeLocation
} from './actions';
import {MapFilterResponse, MapLocationResponse} from './types';
import {split, find} from 'lodash';
import {makeSelectName} from '../LoginPage/selectors';
import LocationAroundMe from 'components/LocationAroundMe';
import SearchDetailMap from 'components/SearchDetailMap';
import {apiGetDirection, clearDirection, drawDirection, getLocation, removeMarkers} from 'utils/googleMaps';
import isUndefined from 'lodash/isUndefined';

const stateSelector = createStructuredSelector({
  mapDetailPage: makeSelectMapDetailPage(),
  userName: makeSelectName(),
  aroundMe: makeSelectLocationAround(),
  searchedLocation: makeSelectLocationSearched()
});

function MapDetailPage(props: RouteChildrenProps<any>) {
  // Warning: Add your key to RootState in types/index.d.ts file
  useInjectReducer({key: 'mapDetailPage', reducer: reducer});
  useInjectSaga({key: 'mapDetailPage', saga: saga});

  const {mapDetailPage, userName, aroundMe, searchedLocation} = useSelector(stateSelector);
  // console.log('=mapDetailPage', mapDetailPage);
  const [polyline, setPolyline] = useState<any>(null);
  const [mapApi, setMapApi] = useState<any>({
    map: null,
    maps: null,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (props.match && props.match.params && props.match.params.id) {
      dispatch(getFilterTravel(props.match.params.id));
    }

    getCurrentLocation();
  }, []);

  /**
   * filter by hash
   */
  useEffect(() => {
    if (props.location.hash) {
      const hash = split(props.location.hash, '=', 2);
      if (hash[0] === '#filter') {
        const filter = hash[1];
        if (filter) {
          const filterSelected = find(mapDetailPage.filters, ['id', +filter]);
          if (filterSelected) {
            dispatch(setFilter(filterSelected));
          }
        }
      }
    }
  }, [props.location.hash]);

  const handleCheckInLocation = () => {
    dispatch(checkInLocation());
  };

  // TODO: bo phan nay di. xem phan select bang URL tai Components/AddressCard (chi su dung link) #filter=X
  const selectFilter = (currentFilter: MapFilterResponse) => {
    dispatch(setFilter(currentFilter));
  };

  const selectedLocation = (
    selectedFilter: MapFilterResponse,
    selectedLocation: MapLocationResponse,
  ) => {
    dispatch(setFilter(selectedFilter));
    dispatch(setLocation(selectedLocation));
  };

  const selectedMapLocation = (selectedLocation: MapLocationResponse) => {
    dispatch(setLocation(selectedLocation));
  };

  const handleClickLike = () => {
    dispatch(clickLike());
  };

  /**
   * Set location when get location done (Location)
   * @param latitude
   * @param longitude
   */
  const setCurrentLocation = (latitude: number, longitude: number) => {
    dispatch(
      setUserLocation({
        longitude,
        latitude,
      }),
    );
  };

  /**
   * Get location promise
   */
  const getCurrentLocation = () => {
    getLocation(setCurrentLocation);
  };

  const [inputSearch, setInputSearch] = React.useState('');
  const [showSearch, setShowSearch] = React.useState(false);
  const onSearchLocation = (inputSearch: string) => {
    setShowSearch(true);
    dispatch(searchLocation(inputSearch));
  };

  /**
   * google api is loaded
   * @param map
   * @param maps
   */
  const googleApiIsLoaded = (map: any, maps: any) => {
    setMapApi({
      map,
      maps,
    });
  };

  const loadDirection = () => {
    removeMarkers();
    const {map, maps} = mapApi;
    const {latitude, longitude} = mapDetailPage.selectedLocation;

    apiGetDirection(mapDetailPage.userLocation,
      {
        latitude,
        longitude
      },
      map, maps, setPolyline);
  };

  /**
   * handle get polyline success
   */
  useEffect(() => {
    const {map} = mapApi;
    console.log('=mapApi', mapApi);
    if (polyline && map) {
      drawDirection(polyline, map);
    }
  }, [polyline]);

  /**
   * Clear direction
   */
  const clearDirectionData = () => {
    if (polyline) {
      clearDirection(polyline);
      // removeMarkers();
    }
  };
  const [open, setOpen] = useState(false);
  // useEffect(() => {
  //   if (!isUndefined(mapDetailPage.selectedLocation) && itemSearch) {
  //     loadDirection();
  //   }
  //   if (!itemSearch) {
  //     clearDirectionData()
  //   }
  // }, [mapDetailPage.selectedLocation, itemSearch]);

  return (
    <div>
      <Helmet>
        <title>Map detail</title>
        <meta name="description" content="Description of map detail"/>
      </Helmet>
      <Container className="map--search">
        <SearchPlace
          searchLocation={onSearchLocation}
          inputSearch={inputSearch}
          setInputSearch={setInputSearch}
          setShowSearch={setShowSearch}
          clearDirectionData={clearDirectionData}
        />
        {
          showSearch && (
            <SearchDetailMap 
              handleSelectedPlace={selectedMapLocation}
              dataSearch={searchedLocation}
              onClickFilter={selectFilter}
              loadDirection={loadDirection}
              clearDirectionData={clearDirectionData}
              open={open}
              setOpen={setOpen}
            />
          )
        }

      </Container>
      <GoogleMap
        selectedPlace={mapDetailPage.selectedLocation}
        places={mapDetailPage.selectedFilter.locations}
        hasLocation={mapDetailPage.hasLocation}
        userLocation={mapDetailPage.userLocation}
        checkInLocation={mapDetailPage.locationCheckIn}
        aroundLocation={mapDetailPage.locationAround}
        handleSelectedPlace={selectedMapLocation}
        handleCheckInLocation={handleCheckInLocation}
        handleClickLike={handleClickLike}
        userName={userName}
        dataSearch={searchedLocation}
        icon={mapDetailPage.selectedFilter.icon}
        googleApiIsLoaded={googleApiIsLoaded}
        loadDirection={loadDirection}
        clearDirectionData={clearDirectionData}
        open={open}
        setOpen={setOpen}
      />
      <div className="map--filter">
        <MapFilter
          onClickItem={selectedLocation}
          onClickLocation={getCurrentLocation}
          selectedFilter={mapDetailPage.selectedFilter}
          filters={mapDetailPage.filters}
          setShowSearch={setShowSearch}
          setInputSearch={setInputSearch}
          clearDirectionData={clearDirectionData}
        />
      </div>
      {aroundMe && aroundMe.length > 0 && (
        <LocationAroundMe
          aroundMe={aroundMe}
          handleSelectedPlace={selectedMapLocation}
          onClickFilter={selectFilter}
          closeLocation={closeLocation}
          inputSearch={inputSearch}
          loadDirection={loadDirection}
          clearDirectionData={clearDirectionData}
          selectedLocation={mapDetailPage.selectedLocation}
        />
      )}
      <Navigations {...props} />
    </div>
  );
}

export default memo(MapDetailPage);
