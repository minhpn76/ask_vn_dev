/**
 *
 * MapMarker
 *
 */
import React, {memo} from 'react';

interface Props {
  active: boolean;
  lat: number;
  lng: number;
  name: string;
  img: string;
  handleClick?: () => void;
}

function MapMarker(props: Props) {
  return (
    <div className={props.active ? 'map--marker active' : 'map--marker'}>
      <div className="map--marker-margin"
           onClick={props.handleClick}
      >
        <img
          className="map--marker-icon"
          src={props.img}
          alt={props.name}
        />
      </div>
    </div>
  );
}

export default memo(MapMarker);
