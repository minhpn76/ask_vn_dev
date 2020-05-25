/**
 *
 * SearchDetailMap
 *
 */
import React, { memo } from 'react';

// import styled from 'styles/styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {
  Container, CardMedia, Card, CardActionArea,
  CardContent, Typography
} from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { ILocationAroundMe, MapFilterResponse } from 'containers/MapDetailPage/types';
import './search--map.scss';
import { isUndefined } from 'lodash';

interface Props {
  dataSearch: ILocationAroundMe[];
  handleSelectedPlace?: (selectedLocation: any) => void;
  onClickFilter?: (currentLocation: MapFilterResponse) => void;
  loadDirection: () => void;
  clearDirectionData?: () => void;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

function SearchDetailMap(props: Props) {
  const {dataSearch, handleSelectedPlace, onClickFilter, loadDirection, open, setOpen } = props;
  const active: boolean = false;
  const handleClick = async (place: any) => {
    props.clearDirectionData!();
    setOpen(!open);
    if (!isUndefined(handleSelectedPlace)) {
      let filterImage = place.filter_images ? place.filter_images : null;
      if (filterImage) {
        place['locations'] = [place];
        place["icon"] = filterImage.icon;
        onClickFilter!(place);
        handleSelectedPlace(place);
      }
    }
  };

  const menu = dataSearch.map((loca, index) => {
    return (
      <div key={index} className={active ? 'map--search-item active' : 'map--search-item'}>
        <Card className="map--search-item-card" onClick={() => handleClick(loca)}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={loca.filter_images.name}
              title={loca.filter_images.name}
              image={loca.filter_images.icon}
            />
            <CardContent>
            <Typography align="center" className="locationName">{loca.location_name}</Typography>
            <Typography align="center" className="locationDes">{loca.description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  });
  
  return (
    <Container className="search--map">
        <ScrollMenu
          alignCenter={false}
          data={menu}
        />

    </Container>
  );
}

export default memo(SearchDetailMap);
