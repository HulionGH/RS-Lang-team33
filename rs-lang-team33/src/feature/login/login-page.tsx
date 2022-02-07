import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import "./login-page.css";

const Login = () => {

  const btnSubmitStyle = { margin: '12px 0', height: "40px" };
  const loginBtn = { marginBottom: '10px' };

  return (
    <Grid className="loginModal">
      <Paper elevation={10} className="paperStyle">
        <Grid>
          <h2 className="titleStyle">Sign In</h2>
        </Grid>
        <TextField style={loginBtn} label='Username' placeholder='Enter username' fullWidth required />
        <TextField style={loginBtn} label='Password' placeholder='Enter password' type='password' fullWidth required />
        <Button type='submit' color='primary' variant="contained" style={btnSubmitStyle} fullWidth>Sign in</Button>
        <Typography> Do you have an account?
          <Link to="/sig-up"> Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Login