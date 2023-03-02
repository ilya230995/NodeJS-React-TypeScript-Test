import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useAppSelector } from '../../hooks/useSelector';
import { TextField, Button as MaterialButton } from '@mui/material';
import { useFormik } from 'formik';
import { login, register } from '../../Redux/auth/thunk';
import { getAuthError, getAuthErrorMessage, getAuthLoading } from '../../Redux/auth/selectors';
import { useNotificationContext } from '../../components/NotificationProvider/NotificationProvider';
import { LoadingResultsT } from '../../types/loading';
import s from './AuthPage.module.scss';

const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const authError = useAppSelector((state) => getAuthError(state));
  const authErrorMessage = useAppSelector((state) => getAuthErrorMessage(state));
  const authLoading = useAppSelector((state) => getAuthLoading(state));
  const { handleNotification } = useNotificationContext();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      if (isRegister) {
        dispatch(register(values));
      } else {
        dispatch(login(values));
      }
    },
  });

  useEffect(() => {
    if (authError === 404) {
      handleNotification('Incorrect email or password', {
        type: 'error',
        variant: 'standard',
      });
    }
    if (authError === 400 && authErrorMessage && !authErrorMessage.includes('password')) {
      handleNotification('This user is already exists. Please login into the app', {
        type: 'error',
        variant: 'standard',
      });
    }
  }, [authError, authErrorMessage]);

  useEffect(() => {
    if (authLoading === LoadingResultsT.SUCCEEDED) {
      formik.resetForm();
    }
  }, [authLoading]);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Welcome!</h1>
      <div className={s.formWrapper}>
        <div className={s.selectionContainer}>
          <h2 className={s.formTitle}>{isRegister ? 'Register' : 'Login'}</h2>
          <MaterialButton
            variant="text"
            sx={{ textDecoration: 'underline', textTransform: 'capitalize' }}
            onClick={() => {
              setIsRegister(!isRegister);
              formik.resetForm();
            }}
          >
            {isRegister ? 'Login' : 'Register'}
          </MaterialButton>
        </div>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <TextField
            required
            id="email"
            type="email"
            label="Email"
            helperText="Please enter your email"
            sx={{ marginBottom: '20px' }}
            value={formik.values.email}
            onChange={(event) => formik.setFieldValue('email', event.target.value)}
          />
          <TextField
            required
            error={!!authErrorMessage && authErrorMessage.includes('password')}
            type="password"
            id="pass"
            label="Password"
            helperText={
              authErrorMessage && authErrorMessage.includes('password')
                ? 'Password should contain more than 8 symbols, big and small letters, special symbols'
                : 'Please enter your password'
            }
            value={formik.values.password}
            onChange={(event) => formik.setFieldValue('password', event.target.value)}
          />
          <MaterialButton
            type="submit"
            variant="contained"
            sx={{ width: '150px', margin: '0 auto', marginTop: '20px' }}
          >
            {isRegister ? 'Register' : 'Login'}
          </MaterialButton>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
