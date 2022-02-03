import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  SvgIcon,
} from "@mui/material";
import "./footer.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ReactComponent as RssIcon } from "../../resources/rs_school_js.svg";
import { Box } from "@mui/system";

const Footer = () => {
  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation showLabels>
        <SvgIcon
          className="school-logo"
          component={RssIcon}
          inheritViewBox
          sx={{ width: 80, height: 40, opacity: 0.7 }}
        />

        <BottomNavigationAction
          label="AliaxeiSehiyenia"
          value="AliaxeiSehiyenia"
          icon={<GitHubIcon sx={{ width: 36, height: 36 }} />}
        />
        <BottomNavigationAction
          label="HulionGH"
          value="HulionGH"
          icon={<GitHubIcon sx={{ width: 36, height: 36 }} />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
