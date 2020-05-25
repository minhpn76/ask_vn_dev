/**
 *
 * TravelGuidesCard
 *
 */
import React, { memo } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { PostTopItemState } from 'containers/HomePage/types';
interface Props {
  itemTravelGuide: PostTopItemState;
}

function TravelGuidesCard(props: Props) {
  const { itemTravelGuide } = props;
  return (
    <div className="Illustrator--container">
      <Card className="Illustrator--card">
        <CardActionArea>
          <CardMedia
            component="img"
            alt={itemTravelGuide.title}
            image={itemTravelGuide.image}
            title={itemTravelGuide.title}
          />
          <CardContent>
            <Typography align="center">{itemTravelGuide.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default memo(TravelGuidesCard);
