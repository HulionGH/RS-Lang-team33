import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import "./sidebar.css";
import SchoolIcon from "@mui/icons-material/School";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HomeIcon from "@mui/icons-material/Home";
import ExtensionIcon from "@mui/icons-material/Extension";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { lightBlue } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <MenuList
      className="navigation-bar"
      sx={{ background: lightBlue.A100, color: lightBlue[50], flexGrow: 1 }}
    >
      <NavLink to="/" className="nav-links">
        <MenuItem>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>About App</ListItemText>
        </MenuItem>
      </NavLink>

      <NavLink to="/book" className="nav-links">
        <MenuItem>
          <ListItemIcon>
            <SchoolIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Student-book</ListItemText>
        </MenuItem>
      </NavLink>

      <NavLink to="/dictionary" className="nav-links">
        <MenuItem>
          <ListItemIcon>
            <LibraryBooksIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dictionary</ListItemText>
        </MenuItem>
      </NavLink>

      <NavLink to="/games" className="nav-links">
        <MenuItem>
          <ListItemIcon>
            <ExtensionIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Games</ListItemText>
        </MenuItem>
      </NavLink>

      <NavLink to="/stats" className="nav-links">
        <MenuItem>
          <ListItemIcon>
            <QueryStatsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Score and Stats</ListItemText>
        </MenuItem>
      </NavLink>

      <NavLink to="/about-us" className="nav-links">
        <MenuItem>
          <ListItemIcon>
            <EmojiPeopleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Our team</ListItemText>
        </MenuItem>
      </NavLink>
    </MenuList>
  );
};

export default SideBar;
