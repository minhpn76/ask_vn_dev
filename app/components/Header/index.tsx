import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import IconMessenger from 'images/messenger.png';
import IconLocation from 'images/location.png';
import IconGirl from 'images/girl.png';

// import styled from 'styles/styled-components';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import './header.scss';

interface Props { }

function Header(props: Props) {

  return (
    <div className="header--background">
      <Grid container className="header--container">
        <Grid item xs={2}>
          <Box component="span">
            <CardMedia
              className="icon--girl"
              component="img"
              image={IconGirl}
              title="icon-girl" />
          </Box>
        </Grid>
        <Grid
          item xs={8}
          className="alert--infor"
        >
          <Typography className="typography">Xin chào</Typography>
          <Typography className="typography">Wanna Ask Vietnamese something?</Typography>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={6}>
              <div className="box-messenger">
                <CardMedia
                  className="icon--messenger"
                  component="img"
                  image={IconMessenger}
                  title="icon-messenger" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="box-location">
                <CardMedia
                  className="icon--location"
                  component="img"
                  src={IconLocation}
                  title="icon-location" />
              </div>
            </Grid>
          </Grid>
  
        </Grid>

      </Grid>
    </div>
  );
}

export default memo(Header);