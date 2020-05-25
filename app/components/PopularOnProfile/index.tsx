/**
 *
 * PopularOnProfile
 *
 */
import React, { memo } from 'react';

import {
  Container, Typography, CardMedia,
  Card, CardHeader, CardContent, CardActionArea,
  Select, MenuItem, InputBase, List, ListItem, ListItemText, ListItemIcon
} from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import 'containers/ProfilePage/profile.scss';
import IllustratorMapsCard from 'components/IllustratorMapsCard/Loadable';
import { PostTopItemState } from 'containers/HomePage/types';

interface Props {
  popularAsk: PostTopItemState[];
}

function PopularOnProfile(props: Props) {
  const {popularAsk} = props;
  let popularList = popularAsk.map((popular, index) => (
    <Card className="Popular--slide--card" key={index}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={popular.title}
          image={popular.image}
          title={popular.title}
        />
        <CardContent>
        <Typography className="title" align="center">{popular.title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));

  return (
    <>
      <Container className="popular--board">
        <Card className="popular--board--card">
          <CardHeader
            title="Popular on AskVietnamese"
          />
          <CardContent>
            <ScrollMenu alignCenter={false} data={popularList} />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default memo(PopularOnProfile);
