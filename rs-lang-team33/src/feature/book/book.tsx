import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ServiceDictionary } from "../../services/dictionary-service";
import "./book.css";
import CardWord from "./card";
import { IWordCard } from "../../interfaces";

const Book = () => {
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(1);
  const [words, setWords] = useState<IWordCard[]>([]);

  const handleChangeSection = (event: SelectChangeEvent) => {
    setGroup(+event.target.value);
  };

  useEffect(() => {
    async function fetchWords() {
      const wordsArr = await ServiceDictionary.getWords(page - 1, group);
      setWords(wordsArr);
    }
    fetchWords();
  }, [page, group]);

  return (
    <div className="content-wrap">
      <div className="content-book">
        <h2 className="main-title">Student-book</h2>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            columnGap: "8px",
          }}
        >
          <FormControl
            className="book-select-section"
            sx={{
              width: "250px",
            }}
          >
            <InputLabel id="select-label">Select SECTION</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={group.toString()}
              label="Select SECTION"
              onChange={handleChangeSection}
            >
              <MenuItem value={0}>Section 1</MenuItem>
              <MenuItem value={1}>Section 2</MenuItem>
              <MenuItem value={2}>Section 3</MenuItem>
              <MenuItem value={3}>Section 4</MenuItem>
              <MenuItem value={4}>Section 5</MenuItem>
              <MenuItem value={5}>Section 6</MenuItem>
              <MenuItem value={6}>Section 7</MenuItem>
            </Select>
          </FormControl>

          <Pagination
            className="book-pagination"
            count={30}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />

          <Button className="game-btn">AUDIOCALL</Button>
          <Button className="game-btn">SPRINT</Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <Box className="book-page">
            {words.map((word) => {
              return <CardWord key={word.id} card={word} />;
            })}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Book;
