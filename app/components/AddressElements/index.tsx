/**
 *
 * AddressElements
 *
 */
import React, { memo } from 'react';
import { Container, Grid } from '@material-ui/core';
import './address.scss';
import AddressCard from 'components/AddressCard';
import {
  FilterMapItemState
} from 'containers/HomePage/types';

interface Props { 
  filterMaps: FilterMapItemState[];
}

function AddressElements(props: Props) {
  const { filterMaps } = props;
  let AddressCards = filterMaps.map((filterMap, index) => {
    return (
      <Grid xs={6} md={3} key={index} item={true} >
        <AddressCard itemAddressCard={filterMap}/>
      </Grid>
    );
  });
  return (
    <>
      <Container className="address--element-container">
        <div className="address--element-wrap">
          <div className="element--title">Are you in <span>Sài Gòn</span> Let's do...</div>
        </div>
      </Container>
      <Container className="container nopadding">
        <Grid container >
          {(AddressCards)}
        </Grid>
      </Container>
      <hr className="element--hr" />
    </>
  );
}

export default memo(AddressElements);
