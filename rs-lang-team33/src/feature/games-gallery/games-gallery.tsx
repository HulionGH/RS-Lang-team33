import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  CardContent,
  Typography,
  CardMedia,
  Card,
} from "@mui/material";
import "./games-gallery.css";
import sprint from "../../resources/sprint.png";
import audioCall from "../../resources/call.jpg";

const GamesGallery = () => {
  let navigate = useNavigate();

  return (
    <div className="content-wrap">
      <div className="content-games-gallery">
        <Card sx={{ width: 270, maxHeight: 400 }}>
          <CardMedia component="img" height="250" image={sprint} alt="Juli" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Sprint
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              Sprint
            </Typography>
            <br />
            <Button
              variant="outlined"
              size="medium"
              onClick={() => navigate("/sprint")}
            >
              START Sprint
            </Button>
          </CardContent>
        </Card>
        <Card sx={{ width: 270, maxHeight: 400 }}>
          <CardMedia
            component="img"
            height="250"
            image={audioCall}
            className="photo-alex"
            alt="Alexei"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              AudioCall
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              AudioCall
            </Typography>
            <br />
            <Button
              variant="outlined"
              size="medium"
              onClick={() => navigate("/audion-call")}
            >
              START AudioCall
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GamesGallery;
