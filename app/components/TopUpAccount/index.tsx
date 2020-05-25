/**
 *
 * TopUpAccount
 *
 */
import React, { memo } from 'react';

import {
  Container,
  Grid,
  CardMedia,
  Typography,
  Popover,
  List,
  ListItemIcon,
  ListItem,
  IconButton,
  ListItemText,
  Dialog,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/Help';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './top-up-account.scss';
interface Props {
  open: boolean;
  handleCloseTopUp: () => void;
  isLogger: boolean;
  onLogout: () => void;
}

let menu = [
  { name: 'Help', url: '/help', icon: <HelpIcon />, code: 2 },
  { name: 'Sign Up', url: '/signup', icon: <ExitToAppIcon />, code: 0 },
  { name: 'My Account', url: '/profile', icon: <AccountCircleIcon />, code: 1 },
  { name: 'Logout', url: '/#', icon: <ExitToAppIcon />, code: 1 },
];

function TopUpAccount(props: Props) {
  const { open, handleCloseTopUp, isLogger, onLogout } = props;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseTopUp}
        fullScreen
        className="topup--account"
      >
        <Container className="account--action">
          <div className="box--action">
            <IconButton
              onClick={handleCloseTopUp}
              className="btn--close"
              size="small"
              color="secondary"
              aria-label="close dialog"
            >
              <CloseIcon />
            </IconButton>
          </div>

          <List>
            {!isLogger ? (
              <>
                <Link to="/profile">
                  <ListItem button>
                    <ListItemIcon className="icon--flag">
                      <HelpIcon />
                    </ListItemIcon>
                    <ListItemText className="text--flag" primary="Help" />
                  </ListItem>
                </Link>
                <Link to="/signup">
                  <ListItem button>
                    <ListItemIcon className="icon--flag">
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText className="text--flag" primary="Sign Up" />
                  </ListItem>
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile">
                  <ListItem className="item--flag" button>
                    <ListItemIcon className="icon--flag">
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText className="text--flag" primary="My Account" />
                  </ListItem>
                </Link>
                <Link to="/profile">
                  <ListItem className="item--flag" button>
                    <ListItemIcon className="icon--flag">
                      <HelpIcon />
                    </ListItemIcon>
                    <ListItemText className="text--flag" primary="Help" />
                  </ListItem>
                </Link>
                <ListItem className="item--flag" button onClick={onLogout}>
                  <ListItemIcon className="icon--flag">
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText className="text--flag" primary="Logout" />
                </ListItem>
              </>
            )}
          </List>
        </Container>
      </Dialog>
    </>
  );
}

export default memo(TopUpAccount);
