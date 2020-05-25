/**
 *
 * MapFilterDialog
 *
 */
import React, {memo} from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import MapFilterTabs from "../MapFilterTabs/Loadable";
import {MapFilterResponse, MapLocationResponse} from "containers/MapDetailPage/types";

interface Props {
  open: boolean;
  handleClose: () => void;
  filters: MapFilterResponse[];
  onClickItem?: (selectedFilter: MapFilterResponse, selectedLocation: MapLocationResponse) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MapFilterDialog(props: Props) {
  const classes = useStyles();

  return (
    <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar} color="default">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
            <ArrowBackIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <MapFilterTabs filters={props.filters} onClickItem={props.onClickItem} isOpen={props.open}/>
    </Dialog>
  );
}

export default memo(MapFilterDialog);
