/**
 *
 * TopUpMessage
 *
 */
import React, {memo} from 'react';

import {
  Container,
  Typography,
  Dialog,
  IconButton,
  Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import history from 'utils/history';
import './topup-message.scss';

interface Props {
  openMessage: boolean;
  handleCloseMessage: () => void;
  point: number;
  userName: string;
}

function TopUpMessage(props: Props) {
  const {openMessage, handleCloseMessage, point, userName} = props;

  const handleClick = () => {
    if (!!userName) {
      history.push('/profile');
    } else {
      history.push('/signup');
    }
  };

  return (
    <>
      <Dialog
        open={openMessage}
        onClose={handleCloseMessage}
        fullScreen
        className="topup--messages"
      >
        <Container className={!!userName ? 'box--messages' : 'box--messages sign-up'}>
          <IconButton
            onClick={handleCloseMessage}
            className="btn--close"
            size="small"
            color="secondary"
            aria-label="close dialog"
          >
            <CloseIcon/>
          </IconButton>
          <div className='bg--messages'>
            <div className="content--messages">
              <div className="messages--box">
                <Typography className="messages--congrats"
                            component="p">{!!userName ? `Congrats! ${userName}` : 'Please sign up to check in'}</Typography>
                {!!userName && (<Typography className="messages--point" component="p">You just received <b
                  className="points">{point} LÁ</b></Typography>)}
              </div>
              <Button className="btn--submit" onClick={handleClick}>{!!userName ? 'CHECK IT HERE' : 'SIGN UP'}</Button>
            </div>
          </div>
        </Container>
      </Dialog>
    </>
  );
}

export default memo(TopUpMessage);
