/**
 *
 * IllustratedMapsElements
 *
 */
import React, { memo } from 'react';

import { Container } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import IllustratorMapsCard from 'components/IllustratorMapsCard/Loadable';
import { PaperMapItemState } from 'containers/HomePage/types';

interface Props {
  paperMaps: PaperMapItemState[];
}

function IllustratedMapsElements(props: Props) {
  const { paperMaps } = props;

  let menu = paperMaps.map((paper, index) => (
    <IllustratorMapsCard key={index} itemPaperMap={paper} />
  ));
  return (
    <>
      <Container className="element--container">
        <div className="element--title-wrap">
          <div className="element--title">
            Illustrated Maps<span> to view online</span>
          </div>
          <div className="element--viewmore">View more</div>
        </div>
        <div className="element--subtittle-wrap">
          <div className="element--subtittle">
            We provide these Paper Maps <span>FOR FREE</span> in your city:
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

export default memo(IllustratedMapsElements);
