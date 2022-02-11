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
  const [group, setGroup] = useState("");
  // const [page, setPage] = useState("");
  const [words, setWords] = useState<IWordCard[]>([]);

  const handleChangeSection = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setGroup(event.target.value as string);
  };

  useEffect(() => {
    async function fetchWords() {
      const wordsArr = await ServiceDictionary.getWords(0, 0);
      setWords(wordsArr);
    }
    fetchWords();
  }, []);

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
              value={group}
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
          <Pagination className="book-pagination" count={30} color="primary" />
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
              return <CardWord key={word.id} />;
            })}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Book;
