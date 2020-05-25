/**
 *
 * Navigations
 *
 */
import React, {memo, useCallback} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CardMedia from '@material-ui/core/CardMedia';
import IconHome from 'images/home.png';
import IconHomeActive from 'images/home_active.png';
import IconBooking from 'images/my_bookings.png';
import IconBookingActive from 'images/my_bookings_active.png';
import IconMap from 'images/map.png';
import IconMapActive from 'images/map_active.png';
import IconProfile from 'images/user.png';
import IconProfileActive from 'images/user_active.png';
import {Link, RouteChildrenProps} from 'react-router-dom';
import {includes} from "lodash";

const useStyles = makeStyles({
  navigationRoot: {
    backgroundColor: '#fff',
    position: 'fixed',
    bottom: 0,
    borderTop: '1px solid #ccc',
    width: '100%',
    zIndex: 100
  },
  actionRoot: {
    maxWidth: '140px',
    minWidth: '65px',
  },
  actionSelected: {
    color: '#fa9026 !important',
    fontSize: '0.7rem !important'
  },
  iconNavigation: {
    width: '24px'
  }
});

const listNav = [
  {label: 'Home', value: 'home', url: '/', icon_active: IconHomeActive, icon: IconHome},
  {label: 'Maps', value: 'maps', url: '/maps', icon_active: IconMapActive, icon: IconMap},
  {label: 'Booking', value: 'booking', url: '/booking', icon_active: IconBookingActive, icon: IconBooking},
  {label: 'Profile', value: 'profile', url: '/profile', icon_active: IconProfileActive, icon: IconProfile}
];

function Navigations(props: RouteChildrenProps<any>) {
  const classes = useStyles();

  let value = 'home';

  listNav.map((data: any) => {
    if (
      props.match && props.match.path
    ) {
      if (data.url === props.match.path || includes(props.match.path, data.url)) {
        value = data.value;
      }
    }
  });

  return (
    <BottomNavigation value={value} classes={{
      root: classes.navigationRoot
    }}>
      {
        listNav.map((nav, index) => {
          return (
            <BottomNavigationAction
              key={index}
              component={Link}
              to={nav.url}
              label={nav.label}
              value={nav.value}
              icon={
                (<CardMedia
                  className={classes.iconNavigation}
                  component="img"
                  src={(value === nav.value) ? nav.icon_active : nav.icon}
                  title={nav.label}/>)}
              classes={{
                root: classes.actionRoot,
                selected: classes.actionSelected,
              }}/>
          );
        })
      }
    </BottomNavigation>
  );
}

export default memo(Navigations);
