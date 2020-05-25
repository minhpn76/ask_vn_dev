/**
 *
 * MapFilterItem
 *
 */
import React, {memo} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {MapFilterResponse} from "containers/MapDetailPage/types";
import './item.scss';
import {isUndefined} from "lodash";

interface Props extends MapFilterResponse {
  active: boolean;
  clearDirectionData?: () => void;
}

function MapFilterItem(props: Props) {
  const {active} = props;

  return (
    <div className={active ? 'map--filter-item active' : 'map--filter-item'}>
      <Card className="map--filter-item-card"
        onClick={() => props.clearDirectionData!()}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.name}
            image={props.icon}
            title={props.name}
          />
          <CardContent>
            <Typography align="center">{props.name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default memo(MapFilterItem);
