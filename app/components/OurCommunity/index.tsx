/**
 *
 * OurCommunity
 *
 */
import React, { memo } from 'react';
import { Container , Grid, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconUser1 from 'images/community_1.png';
import IconUser2 from 'images/community_2.png';
import IconUser3 from 'images/community_3.png';
import IconUser4 from 'images/community_4.png';
import IconUser5 from 'images/community_5.png';
import IconUser6 from 'images/community_6.png';


const useStyles = makeStyles({
  iconItem: {
    width: '60px',
    height: '60px',
    position: 'relative'
  },
  countNumber: {
    position: 'absolute',
    top: '20px',
    left: '12px',
    fontSize: '13px',
    color: '#fff'
  },
  listCommunity: {
    paddingTop: '10px',
    paddingBottom: '20px'
  }
});

interface Props {}
// list of items demo -- will remove
const list = [
  { name: 'item1', image:  IconUser1},
  { name: 'item2', image:  IconUser2 },
  { name: 'item3', image:  IconUser3 },
  { name: 'item4', image:  IconUser4 },
  { name: 'item5', image:  IconUser5 },
  { name: 'item6', image:  IconUser6 },
];


function OurCommunity(props: Props) {
  const classes = useStyles();

  let oursCommunity = list.map((el, index) => {
    return (
      <Grid key={index} item xs={2} className={classes.iconItem}>
        <CardMedia
          component="img"
          alt={el.name}
          image={el.image}
          title={el.name}
        />
        <Typography 
          style={index === 5 ? {display: 'block'} : {display: 'none'}} 
          className={classes.countNumber}
        >+150</Typography>
      </Grid>
    );
  });

  return (
      <>
        <Container className="element--container">
          <div className="element--title-wrap">
            <div className="element--title">Our Community</div>
          </div>
        </Container>
        <Container className={classes.listCommunity}>
          <Grid container spacing={1}>
            {oursCommunity}
          </Grid>
        </Container>
      </>
  );
}

export default memo(OurCommunity);
