/**
 *
 * FlagCountry
 *
 */
import React, { memo } from 'react';

// import styled from 'styles/styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Popover from '@material-ui/core/Popover';
import Dialog from "@material-ui/core/Dialog";
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CardMedia from '@material-ui/core/CardMedia';
import './flag.scss';
import CloseIcon from '@material-ui/icons/Close';
import FlagCA from 'images/flags/ca.png';
import FlagCN from 'images/flags/cn.png';
import FlagDE from 'images/flags/de.png';
import FlagES from 'images/flags/es.png';
import FlagIN from 'images/flags/in.png';
import FlagIT from 'images/flags/it.png';
import FlagJP from 'images/flags/jp.png';
import FlagKR from 'images/flags/kr.png';
import FlagMY from 'images/flags/my.png';
import FlagNZ from 'images/flags/nz.png';
import FlagPH from 'images/flags/ph.png';
import FlagSG from 'images/flags/sg.png';
import FlagTH from 'images/flags/th.png';
import FlagUK from 'images/flags/uk.png';
import FlagUS from 'images/flags/us.png';
import FlagVN from 'images/flags/vn.png';
import { find, isUndefined } from 'lodash';

interface IErrorMessages {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
  country: string;
}
interface Props {
  open: boolean;
  handleClose: () => void;
  setCountryDisplay: (nameCountry: string) => void;
  setFieldValue(field: string, value: any): void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

let listFlags = [
  { id: 1, code: 'VN', name: 'Vietnam', icon: FlagVN },
  { id: 2, code: 'US', name: 'Unites States', icon: FlagUS },
  { id: 3, code: 'UK', name: 'United Kingdom', icon: FlagUK },
  { id: 4, code: 'TH', name: 'Thailand', icon: FlagTH },
  { id: 5, code: 'ES', name: 'Spain', icon: FlagES },
  { id: 6, code: 'SG', name: 'Singapore', icon: FlagSG },
  { id: 7, code: 'PH', name: 'Philippines', icon: FlagPH },
  { id: 8, code: 'NZ', name: 'New Zealand', icon: FlagNZ },
  { id: 9, code: 'MY', name: 'Malaysia', icon: FlagMY },
  { id: 10, code: 'KR', name: 'Korea', icon: FlagKR },
  { id: 11, code: 'JP', name: 'Japan', icon: FlagJP },
  { id: 12, code: 'IT', name: 'Italy', icon: FlagIT },
  { id: 13, code: 'IN', name: 'India', icon: FlagIN },
  { id: 14, code: 'DE', name: 'Germany', icon: FlagDE },
  { id: 15, code: 'CN', name: 'China', icon: FlagCN },
  { id: 16, code: 'CA', name: 'Canada', icon: FlagCA },
  { id: 17, code: 'OTHER', name: 'Others', icon: FlagVN },
];

function FlagCountry(props: Props) {
  const classes = useStyles();
  const {
    open,
    handleClose,
    setCountryDisplay,
    setFieldValue
  } = props;
  const [selected, setSelected] = React.useState(false);
  const handleFlag = (flagCode: string) => {
    const flagChoose = find(listFlags, ['code', flagCode]);
    const code = !isUndefined(flagChoose) ? flagChoose.code : '';
    const name = !isUndefined(flagChoose) ? flagChoose.name : '';
    setCountryDisplay(name);
    setFieldValue('country', code);
    handleClose();
  };
  return (
    <>
      <Dialog
        open={open}
        fullScreen
        onClose={handleClose}
        className="popup--flag"
      >
        <Container className="flags">
          <IconButton onClick={handleClose} className="btn--close"
            size="small"
            color="secondary"
            aria-label="close dialog"
          >
            <CloseIcon />
          </IconButton>
          <List>
            {listFlags.map((flag, index) => {
              return (
                <ListItem
                  className="item--flag"
                  button
                  key={index}
                  onClick={() => handleFlag(flag.code)}
                  selected={selected}
                >
                  <ListItemIcon className="icon--flag">
                    <CardMedia
                      component="img"
                      image={flag.icon}
                      title={flag.name}
                    />
                  </ListItemIcon>
                  <ListItemText className="text--flag" primary={flag.name} />
                </ListItem>
              );
            })}
          </List>
        </Container>
      </Dialog>
    </>
  );
}

export default memo(FlagCountry);
