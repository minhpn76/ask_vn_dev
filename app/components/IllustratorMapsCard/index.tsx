/**
 *
 * IllustratorMapsCard
 *
 */
import React, { memo } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './element.scss';
import {
  PaperMapItemState
} from 'containers/HomePage/types';
interface Props {
  itemPaperMap: PaperMapItemState;
}

function IllustratorMapsCard(props: Props) {
  const { itemPaperMap } = props;
  return (
    <div className="Illustrator--container">
      <Card className="Illustrator--card">
        <CardActionArea>
          <CardMedia
            component="img"
            alt={itemPaperMap.name}
            image={itemPaperMap.icon}
            title={itemPaperMap.name}
          />
          <CardContent>
          <Typography align="center">{itemPaperMap.name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default memo(IllustratorMapsCard);
