import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { Button, Grid, Paper, TextField, Typography } from '@mui/material';

import { createUser } from '../../services/sig-in-up-service';
import "./sign-up-page.css";

const SignUp = () => {
  const [isCanCreating, setIsCanCreating] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [helperTextEmail, setHelperTextEmail] = useState('');
  const [helperTextPassword, setHelperTextPassword] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    if (isCanCreating) {
      onSignUp();
    }
  }, [isCanCreating]);

  const validateEmail = (email: string) => {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  }

  const startCreating = () => {
    validateEmail(email) ? setIsCanCreating(true) : setHelperTextEmail("email is not correct");
  }

  const onSignUp = () => {
    createUser({ name: email, email: email, password: password })
      .then(() => navigate("/sign-in"))
      .catch((error) => onError(error))
  };

  const onError = (error: Error) => {
    setIsCanCreating(false);
    if (Number(error.message) === 417) {
      setHelperTextEmail('user with this e-mail exists');
    } else if (Number(error.message) === 422) {
      setHelperTextPassword('length must be at least 8 characters long');
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
          <h2 className="title-modal">Sign Up</h2>
        </Grid>
        <TextField
          style={inputModal}
          name="email"
          value={email}
          label='email'
          placeholder='Enter username'
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
          onClick={startCreating}>Sign Up</Button>
        <Typography> Do you have an account?
          <Link to="/sign-in"> Sign In</Link>
        </Typography>
      </Paper>
    </Grid>
  )
};

export default SignUp;
