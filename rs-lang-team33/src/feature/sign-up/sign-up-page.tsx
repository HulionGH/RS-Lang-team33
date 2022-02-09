import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import "./sign-up-page.css";

const SignUp = () => {
  const btnModalSubmit = { margin: '12px 0', height: "40px" };
  const inputModal = { marginBottom: '10px' };
  const avatarModal = { backgroundColor: "#1bbd7e" };

  return (
    <Grid className="login-modal">
      <Paper elevation={10} className="paper-style">
        <Grid>
          <Avatar className="avatar-modal" style={avatarModal} sx={{ width: 56, height: 56 }} alt="Avatar"><AddIcon /></Avatar>
          <h2 className="title-modal">Sign Up</h2>
        </Grid>
        <TextField style={inputModal} label='Username' placeholder='Enter username' fullWidth required />
        <TextField style={inputModal} label='Password' placeholder='Enter password' type='password' fullWidth required />
        <Button type='submit' color='primary' variant="contained" style={btnModalSubmit} fullWidth>Sign Up</Button>
        <Typography> Do you have an account?
          <Link to="/sig-in"> Sign In</Link>
        </Typography>
      </Paper>
    </Grid>
  )
};

export default SignUp;
