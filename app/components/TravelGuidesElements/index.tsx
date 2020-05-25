/**
 *
 * TravelGuidesElements
 *
 */
import React, { memo } from 'react';

import { Container } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import TravelGuidesCard from 'components/TravelGuidesCard/Loadable';
import { PostTopItemState } from 'containers/HomePage/types';

interface Props {
  postTops: PostTopItemState[];
}

function TravelGuidesElements(props: Props) {
  const { postTops } = props;
  let menu = postTops.map((travelGuide, index) => (
    <TravelGuidesCard itemTravelGuide={travelGuide} key={index} />
  ));

  return (
    <>
      <Container className="element--container">
        <div className="element--title-wrap">
          <div className="element--title">
            Travel Guides: <span>Most popular questions</span>
          </div>
        </div>
        <div className="element--subtittle-wrap">
          <div className="element--subtittle">
            Best answers from{' '}
            <span className="noUppercase">www.AskVietnamese.vn </span>
          </div>
        </div>
      </Container>
      <Container className="container nopadding">
        <ScrollMenu alignCenter={false} data={menu} />
        <hr className="element--hr" />
      </Container>
    </>
  );
}

export default memo(TravelGuidesElements);
