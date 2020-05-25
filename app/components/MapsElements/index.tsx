/**
 *
 * MapsElements
 *
 */
import React, {memo} from 'react';
import {Container} from '@material-ui/core';

import MapsCard from 'components/MapsCard';
import './maps.scss';
import {
  TravelMapItemState
} from 'containers/MapPage/types';

interface Props {
  travelMaps: TravelMapItemState[];
}

function MapsElements(props: Props) {
  const {travelMaps} = props;

  let mapCard = travelMaps.map((map, index) => <MapsCard mapItem={map} key={index}/>);
  return (
    <>
      <Container className="maps--container">
        {mapCard}
      </Container>
    </>
  );
}

export default memo(MapsElements);
