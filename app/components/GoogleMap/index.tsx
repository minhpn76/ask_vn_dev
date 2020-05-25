/**
 *
 * GoogleMap
 *
 */
import React, {memo, useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {
  defaultCenter,
  ggMapKey,
  optionsMaps,
  zoomDefault,
} from 'contraints/mapStyles';
import './map.scss';
import 'map-icons/dist/css/map-icons.css';
import {MapLocationResponse, Location} from "containers/MapDetailPage/types";
import {isUndefined, findIndex} from 'lodash';
import MapMarker from "../MapMarker/Loadable";
import MapDescDialog from "../MapDescDialog/Loadable";
import CurrentLocationIcon from 'images/currentLocation.png';
import TopUpMessage from '../TopUpMessage';

interface Props {
  icon: string;
  hasLocation: boolean;
  userLocation: Location;
  places?: MapLocationResponse[];
  selectedPlace: MapLocationResponse;
  checkInLocation: MapLocationResponse[];
  userName?: string;
  handleSelectedPlace?: (selectedLocation: MapLocationResponse) => void;
  handleCheckInLocation?: () => void;
  handleClickLike: () => void;
  googleApiIsLoaded: (map: any, maps: any) => void;
  loadDirection: () => void;
  clearDirectionData: () => void;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

function GoogleMap(props: Props) {
  const {
    places, icon, selectedPlace, hasLocation, userLocation, checkInLocation,
    userName, handleCheckInLocation, handleClickLike, googleApiIsLoaded,
    loadDirection, clearDirectionData, open, setOpen
  } = props;
  const [center, setCenter] = useState(defaultCenter);
  // const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  let markers;
  const [canCheckIn, setCanCheckIn] = useState(false);
  if (!isUndefined(places) && places) {
    markers = places.map((value, index) => {
      const {latitude: lat, longitude: lng} = value;
      const iconTemp = value.filter_images ? value.filter_images.icon : '';
      const active = findIndex(checkInLocation, ['id', value.id]) >= 0;
      return (
        <MapMarker
          key={index}
          active={active || !!(selectedPlace && value.id === selectedPlace.id)}
          handleClick={() => {
            handleClick(value);
            setCanCheckIn(active);
            if (!(active || !!(selectedPlace && value.id === selectedPlace.id))) {
              clearDirectionData();
            }
          }}
          img={icon ? icon : iconTemp}
          lat={lat}
          lng={lng}
          name={value.location_name}
        />
      );
    });
  }
  const handleClick = (place: MapLocationResponse) => {
    setOpen(!open);
    if (!isUndefined(props.handleSelectedPlace)) {
      props.handleSelectedPlace(place);
    }
  };

  const handleCheckIn = () => {
    setOpen(!open);
    setOpenMessage(true);
    if (!isUndefined(handleCheckInLocation) && !isUndefined(userName) && !!userName) {
      handleCheckInLocation();
    }
  };

  useEffect(() => {
    if (!isUndefined(selectedPlace)) {
      setCenter({
        lat: selectedPlace.latitude,
        lng: selectedPlace.longitude,
      });
    }
  }, [selectedPlace]);

  useEffect(() => {
    if (hasLocation && userLocation) {
      setCenter({
        lat: userLocation.latitude,
        lng: userLocation.longitude,
      });
    }
  }, [hasLocation, userLocation]);

  const getDirection = () => {
    setOpen(false);
    loadDirection();
  };

  return (
    <div className="map--fullscreen">
      <GoogleMapReact
        options={optionsMaps}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map, maps}) => googleApiIsLoaded(map, maps)}
        bootstrapURLKeys={{key: ggMapKey}}
        defaultCenter={defaultCenter}
        center={center}
        defaultZoom={zoomDefault}
      >
        {hasLocation && userLocation && (
          <MapMarker
            active={true}
            name="User location"
            img={CurrentLocationIcon}
            lat={userLocation.latitude}
            lng={userLocation.longitude}
          />
        )}
        {markers}
      </GoogleMapReact>
      <MapDescDialog
        getDirection={getDirection}
        location={selectedPlace}
        canCheckIn={canCheckIn}
        handleCheckIn={handleCheckIn}
        handleClickLike={handleClickLike}
        open={open}
        handleClose={() => {
          setOpen(!open);
        }}
      />
      <TopUpMessage
        point={selectedPlace.reward_point || 0}
        handleCloseMessage={() => {
          setOpenMessage(!openMessage);
        }}
        userName={userName || ''}
        openMessage={openMessage}
      />
    </div>
  );
}

export default memo(GoogleMap);
