/*
 *
 * LoginPage
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch, connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import {
  Container, Grid, CardMedia, TextField, FormControl,
  InputAdornment, InputLabel, Dialog, Button, DialogContent,
  DialogContentText, DialogTitle, Slide
} from '@material-ui/core';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Logo from 'images/logo.png';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginInPayloadState } from './types';
import { logIn, clearLogin } from './actions';
import { logInFacebook, logInGoogle } from 'containers/SignUpPage/actions';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { TransitionProps } from '@material-ui/core/transitions';
import SocialNetwork from 'components/SocialNetwork/Loadable';

import 'containers/SignUpPage/sign-up.scss';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CssTextField = withStyles({
  root: {
    '& .MuiInput-underline:after': {
      border: 'none',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: 'none',
      },
    },
  },
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    borderRadius: 100,
    backgroundColor: '#B15700',
    border: '1px solid rgb(104,58,13)',
  },
  iconSearch: {
    color: 'rgb(246,109,44)',
  },
}));

const stateSelector = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

interface Props {
  onLogInFacebook: (accessToken: string) => void;
  onLogInGoogle: (accessToken: string) => void;
}

function LoginPage(props: Props) {
  const classes = useStyles();
  useInjectReducer({ key: 'loginPage', reducer: reducer });
  useInjectSaga({ key: 'loginPage', saga: saga });

  const [open, setOpen] = React.useState(false);
  const { loginPage } = useSelector(stateSelector);

  React.useLayoutEffect(() => {
    if (!loginPage.isLoggedIn && loginPage.validationErrors) {
      setOpen(true);
      dispatch(clearLogin());
    }
  }, [loginPage.isLoggedIn, loginPage.validationErrors]);
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  // Validate
  const initialValues = () => {
    return {
      email: '',
      password: '',
    };
  };
  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .trim()
        .email(() => 'Email must be a valid email')
        .required(() => 'Email is requried'),
      password: Yup.string()
        .trim()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required(() => 'Password is requried'),
    });
  };

  const onLogin = (data: loginInPayloadState) => {
    dispatch(logIn(data));
  };

  const onLoginFacebook = (accessToken: string) => {
    props.onLogInFacebook(accessToken);
  };

  const onLoginGoogle = (accessToken: string) => {
    props.onLogInGoogle(accessToken);
  };

  return (
    <>
      <div className="container sign--up" style={{ height: '100vh' }}>
        <Grid container justify="center">
          <Grid item xs={5} className="logo">
            <CardMedia
              className="element--maps-image"
              component="img"
              image={Logo}
              title="logo"
            />
          </Grid>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
          >
            <DialogTitle>
              <ErrorOutlineIcon className="icon--error" />
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Opps! Invalid username and password Please try again.
                {/* {loginPage.validationErrors} */}
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <Formik
            initialValues={initialValues()}
            onSubmit={(values, { setSubmitting }) => {
              onLogin(values);
            }}
            validationSchema={validationSchema}
          >
            {props => (
              <form onSubmit={props.handleSubmit}>
                <Grid item xs={12} className="input--signup">
                  <FormControl className="form--control">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Email
                    </InputLabel>
                    <CssTextField
                      className={classes.root}
                      fullWidth
                      style={
                        props.errors.email && props.touched.email
                          ? { borderColor: 'red' }
                          : { borderColor: 'inherit' }
                      }
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      name="email"
                      type="email"
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmailOutlinedIcon
                              style={
                                props.errors.email && props.touched.email
                                  ? { color: 'red' }
                                  : { color: '#fff' }
                              }
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {props.errors.email && props.touched.email && (
                      <div className="error">{props.errors.email}</div>
                    )}
                  </FormControl>

                  <FormControl className="form--control">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Password
                    </InputLabel>
                    <CssTextField
                      className={classes.root}
                      name="password"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.password}
                      style={
                        props.errors.password && props.touched.password
                          ? { borderColor: 'red' }
                          : { borderColor: 'inherit' }
                      }
                      type="password"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockOpenOutlinedIcon
                              style={
                                props.errors.password && props.touched.password
                                  ? { color: 'red' }
                                  : { color: '#fff' }
                              }
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {props.errors.password && props.touched.password && (
                      <div className="error">{props.errors.password}</div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} className="action--forgot">
                  <Link to="/">Forgot Password?</Link>
                </Grid>
                <Grid item xs={12} className="action--signup action--login">
                  <Button className="btn--signup" type="submit">
                    SIGN IN
                  </Button>
                </Grid>
              </form>
            )}
          </Formik>
          <Grid item xs={12} className="action--signup">
            <Container className="description">or Sign In with</Container>
            <SocialNetwork
              onFacebook={onLoginFacebook}
              onGoogle={onLoginGoogle}
            ></SocialNetwork>
          </Grid>
        </Grid>
      </div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className="nav--already"
      >
        <Grid item xs={12}>
          <Typography align="center" className="text--have--account">
            Don't have an account?
            <Button className="btn--signin" style={{ marginLeft: '10px' }}>
              {/* SIGN IN */}
              <Link style={{ color: '#fff' }} to="/signup">
                SIGN UP
              </Link>
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    onLogInFacebook: (accessToken: string) => {
      dispatch(logInFacebook(accessToken));
    },
    onLogInGoogle: (accessToken: string) => {
      dispatch(logInGoogle(accessToken));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
