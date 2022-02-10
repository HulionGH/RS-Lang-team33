import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/AddPhotoAlternate';

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
  }, []);

  const startCreating = () => {
    setIsCanCreating(true);
    onSignUp();
  }

  const onSignUp = () => {
    // add validation email and password. if invalid don't fetch and show message in helperText
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
  const avatarModal = { backgroundColor: '#1bbd7e' };

  return (
    <Grid className="login-modal">
      <Paper elevation={10} className="paper-style">
        <Grid>
          <Avatar
            className="avatar-modal"
            style={avatarModal}
            sx={{ width: 56, height: 56 }}
            alt="Avatar"><AddIcon /></Avatar>
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
