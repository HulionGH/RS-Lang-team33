import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import "./games-gallery.css";

const GamesGallery = () => {
  let navigate = useNavigate();

  return (
    <div className="content-wrap">
      <div className="content-games-gallery">
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}>
            <Button variant="outlined" size="medium" onClick={() => navigate("/sprint")}>
              Sprint
            </Button>
            <Button variant="outlined" size="medium" onClick={() => navigate("/audion-call")}>
              AudioCall
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default GamesGallery;
