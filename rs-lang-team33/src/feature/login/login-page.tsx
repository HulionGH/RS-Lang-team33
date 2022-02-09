import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import "./login-page.css";

const Login = () => {

  const btnModalSubmit = { margin: '12px 0', height: "40px" };
  const inputModal = { marginBottom: '10px' };

  return (
    <Grid className="login-modal">
      <Paper elevation={10} className="paper-style">
        <Grid>
          <h2 className="title-modal">Sign In</h2>
        </Grid>
        <TextField style={inputModal} label='Username' placeholder='Enter username' fullWidth required />
        <TextField style={inputModal} label='Password' placeholder='Enter password' type='password' fullWidth required />
        <Button type='submit' color='primary' variant="contained" style={btnModalSubmit} fullWidth>Sign in</Button>
        <Typography> Do you have an account?
          <Link to="/sig-up"> Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Login