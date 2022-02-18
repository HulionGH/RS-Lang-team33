import {
  BottomNavigation,
  BottomNavigationAction,
  Link,
  SvgIcon,
} from "@mui/material";
import "./footer.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ReactComponent as RssIcon } from "../../resources/rs_school_js.svg";
import { Box } from "@mui/system";
import { lightBlue } from "@mui/material/colors";

const Footer = () => {
  return (
    <Box sx={{ alignSelf: "flex-end", width: "100%" }}>
      <BottomNavigation showLabels style={{ background: lightBlue.A200 }}>
        <Box>
          <Link href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-2/rs-lang/rslang.md">
            <SvgIcon
              className="school-logo"
              component={RssIcon}
              inheritViewBox
              sx={{ width: 80, height: 40, opacity: 0.7 }}
            />
          </Link>
        </Box>

        <BottomNavigationAction
          href="https://github.com/AliaxeiSehiyenia"
          label="AliaxeiSehiyenia"
          value="AliaxeiSehiyenia"
          icon={<GitHubIcon sx={{ width: 32, height: 32 }} />}
        />
        <BottomNavigationAction
          href="https://github.com/HulionGH"
          label="HulionGH"
          value="HulionGH"
          icon={<GitHubIcon sx={{ width: 32, height: 32 }} />}
        />

        <BottomNavigationAction href="" label="2022" value="2022" />
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
