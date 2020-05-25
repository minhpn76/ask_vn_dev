/**
 *
 * MapDescDialog
 *
 */
import React, {memo} from 'react';
import Rating from '@material-ui/lab/Rating';
import Dialog from "@material-ui/core/Dialog";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PhoneIcon from '@material-ui/icons/Phone';
import LanguageIcon from '@material-ui/icons/Language';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {MapLocationResponse} from "containers/MapDetailPage/types";
import {isUndefined, isEmpty, find, isArray} from "lodash";
import ReactHtmlParser from 'react-html-parser';
import HCMDefaultImage from "images/hcm.jpg";
import OcActive from "images/oc.png";
import OcEmpty from "images/oc_active.png";
import './map.scss';

interface Props {
  open: boolean;
  handleClose: () => void;
  getDirection: () => void;
  handleCheckIn: () => void;
  handleClickLike: () => void;
  location: MapLocationResponse;
  canCheckIn: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function MapDescDialog(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDirection = () => {
    props.getDirection();
  };

  const {location} = props;
  const {business_time} = location;

  let activeTime = false;
  let openTimeText = 'Closed';
  if (!!business_time && isArray(business_time)) {
    activeTime = true;
    const timeData = find(business_time, ['is_today', true]);
    if (!isUndefined(timeData) && !isUndefined(timeData.is_open) && timeData.is_open && !isUndefined(timeData.end) && timeData.end) {
      openTimeText = 'Open now / close at ' + timeData.end;
    }
  } else {
    openTimeText = 'Updating';
  }

  const responsive = {
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <Dialog fullScreen className="map--desc-dialog" open={props.open} onClose={props.handleClose}
            TransitionComponent={Transition}>
      <div className="map--desc-dialog-scroll">
        <div className="map--desc-dialog-header">
          <IconButton
            onClick={props.handleClose}
            size="small"
            color="secondary"
            aria-label="close dialog">
            <CloseIcon/>
          </IconButton>
        </div>

        {!isUndefined(props.location.images) && (
          <Carousel
            infinite={true}
            arrows={false}
            keyBoardControl={false}
            responsive={responsive}>
            {props.location.images.map((images, index) => {
              return (
                <div className="map--desc-dialog-image" key={index}>
                  <img src={images.url}/>
                </div>
              );
            })}

          </Carousel>
        )}
        {isEmpty(props.location.images) && (
          <div className="map--desc-dialog-image">
            <img src={HCMDefaultImage}/>
          </div>
        )}
        <Container>
          <div className="map--desc-dialog-wrap">
            <Typography variant="h5" gutterBottom className="map--desc-dialog-heading">
              {props.location.location_name}
            </Typography>
            <div className="map--desc-dialog-heading-icon">
              <FavoriteIcon onClick={props.handleClickLike}/>
              {!isUndefined(props.location.likes) ? props.location.likes : ''}
            </div>
          </div>
          <div className="map--desc-dialog-summary">
            <Button className="map--desc-dialog-opening-btn" aria-controls="simple-menu" aria-haspopup="true"
                    onClick={handleClick}>
              {openTimeText} <ArrowDropDownIcon/>
            </Button>
            {activeTime && (
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="map--desc-dialog-summary-opening-hour"
              >
                {business_time && business_time.map((value, index) => (
                  <MenuItem key={index} className={value.is_today ? 'active' : ''}
                            onClick={handleClose}>
                    {value.is_allday ? ('All day') : (`${value.day_text}: ${value.start} - ${value.end}`)}
                  </MenuItem>
                ))}
              </Menu>
            )}
            <div className="map--desc-dialog-summary-address">
              {props.location.address}
            </div>
          </div>
          <div className="map--desc-dialog-information">
            <div className="map--desc-dialog-information-about">
              <Typography variant="h6" gutterBottom className="map--desc-dialog-information-title">
                About
              </Typography>
              <Typography className="map--desc-dialog-information-content">
                {ReactHtmlParser(props.location.description)}
              </Typography>
            </div>
            <List component="div" className="map--desc-dialog-information-list" aria-label="main information list">
              {props.location.tags && (
                <ListItem button>
                  <ListItemIcon>
                    <FolderOpenIcon/>
                  </ListItemIcon>
                  <ListItemText primary={props.location.tags}/>
                </ListItem>
              )}
              {props.location.price_range && (
                <ListItem button>
                  <ListItemIcon>
                    <AttachMoneyIcon/>
                  </ListItemIcon>
                  <ListItemText primary={props.location.price_range}/>
                </ListItem>
              )}
              {props.location.contact_info && (
                <ListItem button>
                  <ListItemIcon>
                    <PhoneIcon/>
                  </ListItemIcon>
                  <ListItemText primary={props.location.contact_info}/>
                </ListItem>
              )}
              {props.location.website && (
                <ListItem button>
                  <ListItemIcon>
                    <LanguageIcon/>
                  </ListItemIcon>
                  <ListItemText primary={props.location.website}/>
                </ListItem>
              )}
            </List>
            <div className="map--desc-dialog-information-rate">
              <Typography variant="h6" gutterBottom className="map--desc-dialog-information-title">
                AskVietnamese rate
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Typography gutterBottom className="map--desc-dialog-information-rate-title">
                    Authentic/ Traditional
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Rating readOnly name="size-large" defaultValue={props.location.rate_authentic} size="large"
                          icon={<img src={OcEmpty} alt="Oc Empty" className="map--desc-dialog-information-rate-image"/>}
                          emptyIcon={<img src={OcActive} alt="Oc Active"
                                          className="map--desc-dialog-information-rate-image"/>}/>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Typography gutterBottom className="map--desc-dialog-information-rate-title">
                    Cleaness
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Rating readOnly name="size-large" defaultValue={props.location.rate_cleaness} size="large"
                          icon={<img src={OcEmpty} alt="Oc Empty" className="map--desc-dialog-information-rate-image"/>}
                          emptyIcon={<img src={OcActive} alt="Oc Active"
                                          className="map--desc-dialog-information-rate-image"/>}/>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Typography gutterBottom className="map--desc-dialog-information-rate-title">
                    Decoration
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Rating readOnly name="size-large" defaultValue={props.location.rate_decoration} size="large"
                          icon={<img src={OcEmpty} alt="Oc Empty" className="map--desc-dialog-information-rate-image"/>}
                          emptyIcon={<img src={OcActive} alt="Oc Active"
                                          className="map--desc-dialog-information-rate-image"/>}/>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Typography gutterBottom className="map--desc-dialog-information-rate-title">
                    English friendliness
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Rating readOnly name="size-large" defaultValue={props.location.rate_friendliness} size="large"
                          icon={<img src={OcEmpty} alt="Oc Empty" className="map--desc-dialog-information-rate-image"/>}
                          emptyIcon={<img src={OcActive} alt="Oc Active"
                                          className="map--desc-dialog-information-rate-image"/>}/>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Typography gutterBottom className="map--desc-dialog-information-rate-title">
                    Reasonable price
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Rating readOnly name="size-large" defaultValue={props.location.rate_reasonable} size="large"
                          icon={<img src={OcEmpty} alt="Oc Empty" className="map--desc-dialog-information-rate-image"/>}
                          emptyIcon={<img src={OcActive} alt="Oc Active"
                                          className="map--desc-dialog-information-rate-image"/>}/>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography align="center" className="map--desc-dialog-information-rate-get-point">
                    You can get {props.location.reward_point || 0} Lá here
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </Container>
        <div className="map--desc-dialog-action">
          <Container
            className={props.canCheckIn ? "map--desc-dialog-action-event can-check-in" : "map--desc-dialog-action-event"}>
            < Button className="map--desc-dialog-action-btn" onClick={handleDirection}>
              Get direction
            </Button>
            {props.canCheckIn && (
              <Button className="map--desc-dialog-action-btn" onClick={props.handleCheckIn}>
                Check in
              </Button>
            )}
          </Container>
        </div>
      </div>
    </Dialog>
  );
}

export default memo(MapDescDialog);
