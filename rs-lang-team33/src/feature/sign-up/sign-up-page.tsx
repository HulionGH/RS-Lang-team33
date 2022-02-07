import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import "./sign-up-page.css";

const SignUp = () => {
  const btnSubmitStyle = { margin: '12px 0', height: "40px" };
  const loginBtn = { marginBottom: '10px' };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  return (
    <Grid className="loginModal">
      <Paper elevation={10} className="paperStyle">
        <Grid>
          <Avatar className="avatarModal" style={avatarStyle} sx={{ width: 56, height: 56 }} alt="Avatar"><AddIcon /></Avatar>
          <h2 className="titleStyle">Sign Up</h2>
        </Grid>
        <TextField style={loginBtn} label='Username' placeholder='Enter username' fullWidth required />
        <TextField style={loginBtn} label='Password' placeholder='Enter password' type='password' fullWidth required />
        <Button type='submit' color='primary' variant="contained" style={btnSubmitStyle} fullWidth>Sign Up</Button>
        <Typography> Do you have an account?
          <Link to="/sig-in"> Sign In</Link>
        </Typography>
      </Paper>
    </Grid>
  )
};

export default SignUp;
