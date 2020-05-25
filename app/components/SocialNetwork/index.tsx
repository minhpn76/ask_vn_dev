/**
 *
 * SocailNetwork
 *
 */
import React, { memo } from 'react';
import {
  Grid, CardMedia, IconButton
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import IconFacebook from 'images/ico_facebook.png';
import IconGoogle from 'images/ico_google.png';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';


interface Props {
  onFacebook: (accessToken: string) => void;
  onGoogle: (accessToken: string) => void;
}

function SociallNetwork(props: Props) {
  const { onFacebook, onGoogle } = props;
  const responseFacebook = (response: any) => {
    const { accessToken } = response;
    onFacebook(accessToken);
  };
  const responseGoogle = (response: any) => {
    const { accessToken } = response;
    onGoogle(accessToken);
  };

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={3}>        
          <FacebookLogin
            appId={process.env.FACEBOOK_CLIENT_ID}
            render={renderProps => (
              <>
                <IconButton onClick={renderProps.onClick}
                >
                  <CardMedia
                    component="img"
                    image={IconFacebook}
                    title="facebook"
                  />
                </IconButton>
              </>
            )}
            callback={responseFacebook}
          />
        </Grid>
        <Grid item xs={3}>
          <GoogleLogin
            clientId={process.env.GMAIL_CLIENT_ID || ''}
            render={renderPropsGG => (
              <>
                <IconButton
                  onClick={renderPropsGG.onClick}
                >
                  <CardMedia
                    component="img"
                    image={IconGoogle}
                    title="google"
                  />
                </IconButton>
              </>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />

        </Grid>
      </Grid>
    </>
  );
}

export default memo(SociallNetwork);
