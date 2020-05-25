/**
 *
 * AddressCard
 *
 */
import React, {memo} from 'react';
import {Link} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './address.scss';
import {
  FilterMapItemState
} from 'containers/HomePage/types';

interface Props {
  itemAddressCard: FilterMapItemState;
}

function AddressCard(props: Props) {
  const {itemAddressCard} = props;
  return (
    <div className="address--container">
      <Card className="address--card">
        <Link to={`/maps/${itemAddressCard.map_id}#filter=${itemAddressCard.id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={itemAddressCard.name}
              image={itemAddressCard.icon}
              title={itemAddressCard.name}
            />
            <CardContent>
              <Typography align="center">{itemAddressCard.name}</Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </div>
  );
}

export default memo(AddressCard);
