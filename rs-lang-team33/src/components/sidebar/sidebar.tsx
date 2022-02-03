import { ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from "@mui/material";
import './sidebar.css'

const SideBar = () => {
    
  return (
    <MenuList className="navigation-bar">
      <MenuItem>
        <ListItemIcon>ICON</ListItemIcon>
        <ListItemText>About App</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>ICON</ListItemIcon>
        <ListItemText>Student-book</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>ICON</ListItemIcon>
        <ListItemText>Games</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>ICON</ListItemIcon>
        <ListItemText>Score and Stats</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>ICON</ListItemIcon>
        <ListItemText>Our team</ListItemText>
      </MenuItem>
    </MenuList>

  )
}

export default SideBar;
