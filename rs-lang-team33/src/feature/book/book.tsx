import { Box, Button } from "@mui/material";
import "./book.css";

const Book = () => {
  return (
    <div className="content-wrap">
      <div className="content-book">
        <h2>Student-book</h2>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            className="section-btns"
          >
            <Button variant="outlined" size="medium">
              Section 1
            </Button>
            <Button variant="outlined" size="medium">
              Section 2
            </Button>
            <Button variant="outlined" size="medium">
              Section 3
            </Button>
            <Button variant="outlined" size="medium">
              Section 4
            </Button>
            <Button variant="outlined" size="medium">
              Section 5
            </Button>
            <Button variant="outlined" size="medium">
              Section 6
            </Button>
            <Button variant="outlined" size="medium">
              Section 7
            </Button>
          </Box>

          <Box></Box>
        </Box>
      </div>
    </div>
  );
};

export default Book;
