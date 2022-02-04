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

const SideBar = () => {
  return (
    <MenuList
      className="navigation-bar"
      sx={{ background: lightBlue.A100, color: lightBlue[50], flexGrow: 1 }}
    >
      <MenuItem>
        <ListItemIcon>
          <HomeIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>About App</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <SchoolIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Student-book</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <LibraryBooksIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Dictionary</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <ExtensionIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Games</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <QueryStatsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Score and Stats</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <EmojiPeopleIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Our team</ListItemText>
      </MenuItem>
    </MenuList>
  );
};

export default SideBar;
