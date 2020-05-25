/**
 *
 * LocationAroundMe
 *
 */
import React, { memo } from 'react';

// import styled from 'styles/styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {
  CardMedia, Dialog, Container,
  IconButton, Typography, Grid
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './around--me.scss';
import { ILocationAroundMe, MapFilterResponse,Location, MapLocationResponse } from 'containers/MapDetailPage/types';
import { slice, remove } from 'lodash';
import { isUndefined } from 'util';
import ReactDOM from 'react-dom';

interface Props {
  aroundMe: ILocationAroundMe[];
  inputSearch?: string;
  handleSelectedPlace?: (selectedLocation: any) => void;
  onClickFilter?: (currentLocation: MapFilterResponse) => void;
  closeLocation?: (locationCloseed: Location) => void;
  loadDirection: () => void;
  clearDirectionData: () => void;
  selectedLocation: MapLocationResponse;
}

function LocationAroundMe(props: Props) {
  const { aroundMe, handleSelectedPlace, onClickFilter, inputSearch, loadDirection, clearDirectionData, selectedLocation } = props;
  let tempListPopupSlice: ILocationAroundMe[] = slice(aroundMe, 0, 3);
  let tempListPopUpId: any = tempListPopupSlice.map((loca, index) => {
    return `location_${loca.id}`;
  });
  // Dialog
  const [open, setOpen] = React.useState(true);
  const closePopup = () => {
    setOpen(false);
  };
  
  React.useEffect(() => {
    let tempAround: any = {
      id: 0,
      name: '',
      icon: '',
      is_landmark: 0,
      travel_id: '',
      map_id: 0,
      pin: ''
    };
    tempAround['locations'] = tempListPopupSlice;
    onClickFilter!(tempAround);
  }, []);

  React.useEffect(() => {
    if (inputSearch) {
      tempListPopupSlice.map((location, index) => {
        let element = document.querySelector(`#location_${location.id}`) as HTMLElement;
        element.style.display = 'none';
      });
    }
  }, [inputSearch]);

  const handleClick = (place: any) => {
    // setOpen(!open);
    if (!isUndefined(handleSelectedPlace)) {
      let filterImage = place.filter_images ? place.filter_images : null;
      if (filterImage) {
        place['locations'] = [place];
        place["icon"] = filterImage.icon;
        onClickFilter!(place);
        handleSelectedPlace(place);
      }
    }
    tempListPopupSlice.map((location, index) => {
      let element = document.querySelector(`#location_${location.id}`) as HTMLElement;
      element.style.display = 'none';
    });

  };
  const handleCloseTopUp = (id: string | undefined, tempIndex: number) => {
    if (!isUndefined(id)) {
      let element = document.querySelector(`#${id}`) as HTMLElement;
      remove(tempListPopUpId, (item) => {
        return item === id;
      });
      if (tempListPopUpId.length === 0) {
        element.style.display = 'none';
        return;
      }
      let elementFirst = document.querySelector(`#${tempListPopUpId[0]}`) as HTMLElement;
      let elementSecond = document.querySelector(`#${tempListPopUpId[1]}`) as HTMLElement;

      if (!isUndefined(element) && element && !isUndefined(elementFirst) && !isUndefined(elementSecond)) {
        element.style.display = 'none';
        element.style.top = '0';
        elementFirst!.style.top = '65px';
        if (tempListPopUpId.length > 1) {
          elementSecond!.style.top = '175px';
        }    
      }
      // TODO: API close
      // props.closeLocation({
      //   latitude: 0,
      //   longitude: 0
      // })
      
    }
  };
  // end
  const { innerWidth } = window;
  let pecentTemp = (innerWidth === 414) ? 65 :  55;
  const listPopup = tempListPopupSlice.map((location, index) => {
    const id = open ? `location_${location.id}` : undefined;
    let tempIndex = index + 1;
    let positionTop = `${tempIndex * 65}px`;
    if (tempIndex > 1) {
      positionTop = `${tempIndex * 65 + 45 * index}px`;
    }
    if (tempIndex > 2) {
      positionTop = `${tempIndex * 65 + pecentTemp * index}px`;
    }
    return (
      <Container key={index} style={{
        // position: 'absolute', top: positionTop
      }} className="container--locaiton" id={id}>
      <div className="topup-around">
        <Grid container spacing={2} direction="row"
            // justify="center"
            alignItems="center"
            onClick={() => handleClick(location)}
          >
          <Grid item xs={3} className="img">
            <CardMedia
              component="img"
              className="imageLocation"
              alt={location.filter_images.name}
              image={location.filter_images.icon}
              title={location.filter_images.name}
            />
          </Grid>
          <Grid item xs={9} className="description">
            <Typography className="text">
              You are just {location.distance_text} away from {location.location_name}. Go there to get <b>{location.reward_point} LÁ!!!</b>
            </Typography>
          </Grid>

        </Grid>
        <div className="box--action">
          <IconButton
            onClick={() => handleCloseTopUp(id, tempIndex)}
            className="btn--close"
            size="small"
            color="secondary"
            aria-label="close dialog"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </Container>
    );
  });
  return (
    <Container 
      className="topup--mess popover-loaction"
    >
      {/* <Dialog
        open={open}
        onClose={closePopup}
        fullScreen
        className="topup--mess popover-loaction"
      > */}
      {aroundMe && aroundMe.length > 0 ? (
        listPopup
      ) : (<></>)}
      {/* </Dialog> */}
    </Container>
  );
}

export default memo(LocationAroundMe);
