import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import "./about-us.css";
import alex from "../../resources/IMG_20170925_110510.jpg";
import juli from "../../resources/8dbf76c2-1829-4223-8070-19ffb3622655.jpg";

const AboutUs = () => {
  return (
    <div className="content-wrap">
      <div className="content-about-us">
        <Card sx={{ maxWidth: 320, maxHeight: 450 }}>
          <CardMedia component="img" height="300" image={juli} alt="Juli" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Julia H.
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              Julia developed: student-book, dictionary, home page and
              navigation, page "our team", project description and related
              API-Services.
            </Typography>
            <Link href="https://github.com/HulionGH">
              <Button size="small">go to GitHub</Button>
            </Link>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 320, maxHeight: 450 }}>
          <CardMedia
            component="img"
            height="300"
            image={alex}
            className="photo-alex"
            alt="Alexei"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Alexei S.
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              Alexei developed: authorization, Sprint game, Audio-call game,
              statistics, related API-Services, group in Discord for discussing
              project.
            </Typography>
            <Link href="https://github.com/AliaxeiSehiyenia">
              <Button size="small">go to GitHub</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
