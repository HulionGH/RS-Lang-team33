import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { lightBlue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <AppBar position="static" style={{ background: lightBlue.A200 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LANG-33
        </Typography>
        <Link to="/sign-in" className="btnHeaderLogin">Login</Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
