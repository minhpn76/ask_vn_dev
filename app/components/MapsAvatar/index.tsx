/**
 *
 * MapsCard
 *
 */
import React, {memo} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import {
  TravelMapItemState
} from 'containers/HomePage/types';
import {Link} from "react-router-dom";

interface Props {
  key: number;
  itemMapAvatar: TravelMapItemState;
}

function MapsAvatar(props: Props) {
  const {key, itemMapAvatar} = props;
  return (
    <div className="element--maps-avatar">
      <Card className="element--maps-card">
        <Link to={`/maps/${itemMapAvatar.id}`}>
          <CardActionArea>
            <CardMedia
              key={key}
              className="element--maps-image"
              component="img"
              image={itemMapAvatar.icon}
              title={itemMapAvatar.name}/>
          </CardActionArea>
        </Link>
      </Card>
    </div>
  );
}

export default memo(MapsAvatar);
