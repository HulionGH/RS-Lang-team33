import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Grid, Paper, TextField, Typography } from '@mui/material';

import { loginUser } from '../../services/sig-in-up-service';
import "./login-page.css";

export type userInfo = {
  name: string,
  email: string,
  password: string,
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
};

const Login = () => {
  const [isCanCreating, setIsCanCreating] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [helperTextEmail, setHelperTextEmail] = useState('');
  const [helperTextPassword, setHelperTextPassword] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    if (isCanCreating) {
      onSignIn();
    }
  }, []);

  const startCreating = () => {
    setIsCanCreating(true);
    onSignIn();
  }

  const onSignIn = () => {
    // add validation email and password. if invalid don't fetch and show message in helperText
    loginUser({ email: email, password: password })
      .then((res) => {
        setLocalStorage({
          name: res.name,
          email: email,
          password: password,
          message: res.message,
          token: res.token,
          refreshToken: res.refreshToken,
          userId: res.userId,
        });
        navigate("/")
      })
      .catch((error) => onError(error))
  };

  const setLocalStorage = (userInfo: userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  const onError = (error: Error) => {
    setIsCanCreating(false);
    if (Number(error.message) === 404) {
      setHelperTextEmail(`Couldn't find a(an) user with: {"email":"akshdjfhash@mail.ru"}`);
    } else if (Number(error.message) === 403) {
      setHelperTextPassword('incorrect password');
    }
  };

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setHelperTextEmail('');
    setHelperTextPassword('');
    if ((event.target as HTMLInputElement).name === 'email') {
      setEmail((event.target as HTMLInputElement).value);
    } else {
      setPassword((event.target as HTMLInputElement).value);
    }
  }

  const btnModalSubmit = { margin: '12px 0', height: "40px" };
  const inputModal = { marginBottom: '10px' };

  return (
    <Grid className="login-modal">
      <Paper elevation={10} className="paper-style">
        <Grid>
          <h2 className="title-modal">Sign In</h2>
        </Grid>
        <TextField
          style={inputModal}
          name="email"
          value={email}
          label='email'
          placeholder='Enter email'
          helperText={helperTextEmail}
          fullWidth
          required
          onChange={onValueChange} />
        <TextField
          style={inputModal}
          name="password"
          value={password}
          label='Password'
          placeholder='Enter password'
          helperText={helperTextPassword}
          type='password'
          fullWidth
          required
          onChange={onValueChange} />
        <Button
          type='submit'
          color='primary'
          variant="contained"
          style={btnModalSubmit}
          fullWidth
          onClick={startCreating}>Sign in</Button>
        <Typography> Do you have an account?
          <Link to="/sign-up"> Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Login