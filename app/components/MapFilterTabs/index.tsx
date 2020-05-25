import React, {memo, useEffect, useState, useRef} from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {MapFilterResponse, MapLocationResponse} from "containers/MapDetailPage/types";
import './tabs.scss';
import MapFilterTabsList from "./list";
import {isUndefined} from "lodash";

interface Props {
  isOpen: boolean;
  onClickItem?: (selectedFilter: MapFilterResponse, selectedLocation: MapLocationResponse) => void;
  filters: MapFilterResponse[];
}

function MapFilterTabs(props: Props) {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const {filters, isOpen, onClickItem} = props;
  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);
  return (
    <div className="map--filter-tabs">
      <Slider
        asNavFor={nav1}
        ref={slider2}
        slidesToShow={filters.length >= 3 ? 3 : 1}
        swipeToSlide={true}
        focusOnSelect={true}
        centerMode
        arrows={false}
        centerPadding={filters.length >= 3 ? 0 : 100}
      >
        {filters.map((item, index) => {
          return (
            <Typography component="div" className="map--filter-tab" key={item.id}>
              {item.name}
            </Typography>
          );
        })}
      </Slider>
      <Slider className="mainSlider"
              asNavFor={nav2}
              arrows={false}
              ref={slider1}>
        {filters.map((item, index) => {
          if (!isUndefined(item.locations)) {
            return (
              <MapFilterTabsList
                filter={item}
                onClickItem={onClickItem}
                locations={item.locations}
                key={item.id}
                isOpen={isOpen}/>
            );
          }
          return (
            <div key={item.id}></div>
          );
        })}
      </Slider>

    </div>
  );
}

export default memo(MapFilterTabs);
