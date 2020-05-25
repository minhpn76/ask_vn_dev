/*
 *
 * SignUpPage
 *
 */

import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { RouteChildrenProps, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import makeSelectSignUpPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Logo from 'images/logo.png';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import IconButtonSignUp from 'images/btn_signup.png';
import FlagCountry from 'components/FlagCountry/Loadable';
import { postSignUp, clearSignUp, logInFacebook, logInGoogle } from './actions';
import { ISignUpPaloadState } from './types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import SocialNetwork from 'components/SocialNetwork/Loadable';

import './sign-up.scss';

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
  signUpPage: makeSelectSignUpPage(),
});

interface Props {}

function SignUpPage(props: Props) {
  const classes = useStyles();
  // Warning: Add your key to RootState in types/index.d.ts file
  useInjectReducer({ key: 'signUpPage', reducer: reducer });
  useInjectSaga({ key: 'signUpPage', saga: saga });

  const { signUpPage } = useSelector(stateSelector);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [alert, setAlert] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useLayoutEffect(() => {
    if (!signUpPage.isSignUp && signUpPage.validationErrors) {
      setAlert(true);
      dispatch(clearSignUp());
    }
  }, [signUpPage.isSignUp, signUpPage.validationErrors]);

  const handleCloseAlert = () => {
    setAlert(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [countryDisplay, setCountryDisplay] = useState('');

  // Validate
  const initialValues = () => {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      country: '',
    };
  };
  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string()
        .trim()
        .min(7, 'Full name is too short - should be 7 chars minimum.')
        .required(() => 'Full name is requried'),
      email: Yup.string()
        .trim()
        .email(() => 'Email must be a valid email')
        .required(() => 'Email is requried'),
      country: Yup.string()
        .trim()
        .required(() => 'Country is requried'),
      password: Yup.string()
        .trim()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required(() => 'Password is requried'),
      password_confirmation: Yup.string()
        .trim()
        .oneOf([Yup.ref('password'), null], 'Password Confirm must match')
        .required(() => 'Password Confirm is requried'),
    });
  };

  const onSubmit = (data: ISignUpPaloadState) => {
    dispatch(postSignUp(data));
  };
  const onSignupFacebook = (accessToken: string) => {
    dispatch(logInFacebook(accessToken));
    // console.log('Sungup');
  };

  const onSignupGoogle = (accessToken: string) => {
    dispatch(logInGoogle(accessToken));
    // console.log('Sungup');
  };

  return (
    <>
      <div className="container sign--up">
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
            open={alert}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseAlert}
          >
            <DialogTitle>
              <ErrorOutlineIcon className="icon--error" />
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Opps! Register has failed Please try again.
                {/* {loginPage.validationErrors} */}
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <Formik
            initialValues={initialValues()}
            onSubmit={(values, { setSubmitting }) => {
              onSubmit(values);
              setSubmitting(false);
            }}
            validationSchema={validationSchema}
          >
            {props => (
              <form onSubmit={props.handleSubmit}>
                <Grid item xs={12} className="input--signup">
                  <FormControl className="form--control">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Full name
                    </InputLabel>
                    <CssTextField
                      style={
                        props.errors.name && props.touched.name
                          ? { borderColor: 'red' }
                          : { borderColor: 'inherit' }
                      }
                      className={classes.root}
                      name="name"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <PersonOutlineOutlinedIcon
                              style={
                                props.errors.name && props.touched.name
                                  ? { color: 'red' }
                                  : { color: '#fff' }
                              }
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {props.errors.name && props.touched.name && (
                      <div className="error">{props.errors.name}</div>
                    )}
                  </FormControl>
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
                    <InputLabel shrink>Country</InputLabel>
                    <div onClick={(event: any) => handleClick(event)}>
                      <CssTextField
                        disabled={true}
                        name="country"
                        style={
                          props.errors.country
                            ? { borderColor: 'red' }
                            : { borderColor: 'inherit' }
                        }
                        className={classes.root}
                        value={countryDisplay}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      />
                      {props.errors.country && (
                        <div className="error">{props.errors.country}</div>
                      )}
                    </div>
                  </FormControl>
                  <FlagCountry
                    open={open}
                    handleClose={handleClose}
                    setCountryDisplay={setCountryDisplay}
                    setFieldValue={props.setFieldValue}
                  ></FlagCountry>
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
                  <FormControl className="form--control">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Confirm Password
                    </InputLabel>
                    <CssTextField
                      className={classes.root}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.password_confirmation}
                      style={
                        props.errors.password_confirmation &&
                        props.touched.password_confirmation
                          ? { borderColor: 'red' }
                          : { borderColor: 'inherit' }
                      }
                      fullWidth
                      type="password"
                      name="password_confirmation"
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockOpenOutlinedIcon
                              style={
                                props.errors.password_confirmation &&
                                props.touched.password_confirmation
                                  ? { color: 'red' }
                                  : { color: '#fff' }
                              }
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {props.errors.password_confirmation &&
                      props.touched.password_confirmation && (
                        <div className="error">
                          {props.errors.password_confirmation}
                        </div>
                      )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} className="action--signup">
                  <Button className="btn--signup" type="submit">
                    SIGN UP
                  </Button>
                </Grid>
              </form>
            )}
          </Formik>
          <Grid item xs={12} className="action--signup">
            <Container className="description">or Sign Up with</Container>
            <SocialNetwork
              onFacebook={onSignupFacebook}
              onGoogle={onSignupGoogle}
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
            Already have an account?
            <Button className="btn--signin" style={{ marginLeft: '10px' }}>
              {/* SIGN IN */}
              <Link style={{ color: '#fff' }} to="/login">
                SIGN IN
              </Link>
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default memo(SignUpPage);
