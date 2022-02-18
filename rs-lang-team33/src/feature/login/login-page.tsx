import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Grid, Paper, TextField, Typography } from '@mui/material';

import { loginUser } from '../../services/sig-in-up-service';
import { IUserInfo } from '../../interfaces';
import "./login-page.css";

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
  }, [isCanCreating]);

  const validateEmail = (email: string) => {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  }

  const startCreating = () => {
    validateEmail(email) ? setIsCanCreating(true) : setHelperTextEmail("email is not correct");
  }

  const onSignIn = () => {
    loginUser({ email: email, password: password })
      .then((res) => {
        setLocalStorage({
          name: res.name,
          email: email,
          message: res.message,
          token: res.token,
          refreshToken: res.refreshToken,
          userId: res.userId,
        });
        navigate("/")
      })
      .catch((error) => onError(error))
  };

  const setLocalStorage = (userInfo: IUserInfo) => {
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