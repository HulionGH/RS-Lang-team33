import { Box, Typography } from "@mui/material";
import "./home-page.css";

const Home = () => {
  return (
    <div className="content-wrap">
      <div className="content-home">
        <Box>
          <Typography variant="h4" className="typography-text">
            The best way to learn a language? LANG-33.
          </Typography>

          <Typography variant="h6" className="typography-text">
            Whether you’re learning English for a new job or relocate, your path
            to better language skills starts here. Our application is proven to
            be the best way to learn English.
          </Typography>
          <br />
          <hr />
          <br />

          <Typography variant="h5" className="typography-text">
            {" "}
            1. Study as much or as little as you want.{" "}
          </Typography>

          <br />
          <Typography variant="h5" className="typography-text">
            2. Keep it interesting with listening <br />
            words and examples in Student-book.
          </Typography>

          <br />
          <Typography variant="h5" className="typography-text">
            3. Keep it challenging with playing <br />
            our games - Sprint and AudioCall. It will <br />
            help lodge words into your long-term memory.
          </Typography>

          <br />
          <Typography variant="h5" className="typography-text">
            4. Analize your progress into statistics page.
          </Typography>
          <hr />
          <br />
          <Typography variant="h5" className="typography-text">
            The limits of my language - are the limits of my world.
            <br />
            (c) Ludwig Josef Johann Wittgenstein
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Home;
