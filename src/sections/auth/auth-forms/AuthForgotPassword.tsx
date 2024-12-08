'use client';

// next
import { useRouter } from 'next/navigation';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { Alert } from '@mui/material'

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/@extended/AnimateButton';


// types
import axios from 'axios';
import { useState } from 'react';

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: string;
}

const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: '',
  alertSeverity: ''
};

const phoneRegExp = /^\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

export default function AuthForgotPassword() {
  const scriptedRef = useScriptRef();
  const router = useRouter();

  const [alert, setAlert] = useState(EMPTY_ALERT);

  const onSuccess = () => {
    setAlert({
      showAlert: true,
      alertMessage: 'Password was updated successfully, please relogin.',
      alertSeverity: 'success'
    });
  };

  const onError = () => {
    setAlert({
      showAlert: true,
      alertMessage: 'Password was not updated, given information is incorrect.',
      alertSeverity: 'error'
    });
  };

  return (
    <>
      {alert.showAlert && (
        <Alert sx={{marginBottom:2}} severity={alert.alertSeverity as any} onClose={() => setAlert(EMPTY_ALERT)}>
          {alert.alertMessage}
        </Alert>
      )}
      <Formik
        initialValues={{
          username: '',
          email: '',
          phone: '',
          newPassword: '',
          confirmNewPassword: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Username is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          phone: Yup.string().matches(phoneRegExp).required('Phone number is not valid'),
          newPassword: Yup.string()
          .required('Password is required')
          .test('no-leading-trailing-whitespace', 'Password cannot start or end with spaces', (value) => value === value.trim())
          .max(24, 'Password must be less than 24 characters')
          .min(8, 'Password must be at least 8 characters')
          .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
          .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
          .matches(/\d/, 'Password must contain at least one number')
          .matches(/[!@#$%^&*]/, 'Password must contain at least one special character'),
          confirmNewPassword: Yup.string()
          .required('Password is required')
          .test('no-leading-trailing-whitespace', 'Password cannot start or end with spaces', (value) => value === value.trim())
          .max(24, 'Password must be less than 24 characters')
          .min(8, 'Password must be at least 8 characters')
          .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
          .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
          .matches(/\d/, 'Password must contain at least one number')
          .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
          .oneOf([Yup.ref('newPassword')], 'Password does not match new password'),
        })}
        onSubmit={(values, { setErrors, setSubmitting, setValues, resetForm }) => {
          console.dir(values);
          axios.put('http://localhost:4000/forgotPassword', { username: values.email, email: values.email, phone: values.phone, newPassword: values.newPassword, confirmNewPassword: values.confirmNewPassword})
          .then((res: any) => {
            if (res?.error) {
              onError();
            } else {
              onSuccess();
            }
            setSubmitting(false);
        }).catch((error) => {
          onError();
        });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="username-forgot">Username</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                    id="username-forgot"
                    type="username"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter a username"
                    inputProps={{}}
                  />
                </Stack>
                {touched.username && errors.username && (
                  <FormHelperText error id="helper-text-username-forgot">
                    {errors.username}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-forgot">Email Address</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-forgot"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter a email address"
                    inputProps={{}}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-forgot">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-forgot">Phone Number</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                    id="phone-forgot"
                    type="phone"
                    value={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter a phone number"
                    inputProps={{}}
                  />
                </Stack>
                {touched.phone && errors.phone && (
                  <FormHelperText error id="helper-text-phone-forgot">
                    {errors.phone}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="newPassword-forgot">New Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    id="newPassword-forgot"
                    type="newPassword"
                    value={values.newPassword}
                    name="newPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter a new password"
                    inputProps={{}}
                  />
                </Stack>
                {touched.newPassword && errors.newPassword && (
                  <FormHelperText error id="helper-text-newPassword-forgot">
                    {errors.newPassword}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="confirmNewPassword-forgot">Confirm new password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
                    id="confirmNewPassword-forgot"
                    type="confirmNewPassword"
                    value={values.confirmNewPassword}
                    name="confirmNewPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    inputProps={{}}
                  />
                </Stack>
                {touched.confirmNewPassword && errors.confirmNewPassword && (
                  <FormHelperText error id="helper-text-confirmNewPassword-forgot">
                    {errors.confirmNewPassword}
                  </FormHelperText>
                )}
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Send Password Reset Email
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
