/**
 *
 * AvailbleMapsElements
 *
 */
import React, {memo} from 'react';

// import styled from 'styles/styled-components';
import './element.scss';
import {Container} from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import MapsAvatar from 'components/MapsAvatar/Loadable';
import {Link} from "react-router-dom";
import {
  TravelMapItemState
} from 'containers/HomePage/types';

interface Props {
  travelMaps: TravelMapItemState[];
}

function AvailbleMapsElements(props: Props) {
  const {travelMaps} = props;

  let menu = travelMaps.map((el, index) => <MapsAvatar key={index} itemMapAvatar={el}/>);

  return (
    <>
      <Container className="element--container">
        <div className="element--title-wrap">
          <div className="element--title">Available Maps<span> across Vietnam</span></div>
          <div className="element--viewmore">
            <Link to={'/maps'}>View more</Link>
          </div>
        </div>
        <div className="element--subtittle-wrap">
          <div className="element--subtittle">We <span>REALLY NEED YOUR HELP</span> to build up more Travel Maps in
            Vietnam
          </div>
        </div>
      </Container>
      <Container className="container nopadding">
        <ScrollMenu
          alignCenter={false}
          data={menu}
        />
        <hr className="element--hr"/>
      </Container>
    </>
  );
}

export default memo(AvailbleMapsElements);
