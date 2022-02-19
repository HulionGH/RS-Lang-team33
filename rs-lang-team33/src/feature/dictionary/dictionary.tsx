import { Box, Button, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IWordCard } from "../../interfaces";
import { ServiceDictionary } from "../../services/dictionary-service";
import "./dictionary.css";
import Word from "./word";

const Dictionary = () => {
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(1);
  const [words, setWords] = useState<IWordCard[]>([]);

  useEffect(() => {
    async function fetchWords() {
      const wordsArr = await ServiceDictionary.getWords(page - 1, group);
      setWords(wordsArr);
    }
    fetchWords();
  }, [page, group]);

  let navigate = useNavigate();

  return (
    <div className="content-wrap">
      <div className="content-dictionary">
        <h2 className="main-title">Dictionary</h2>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            columnGap: "8px",
          }}
        >
          <Pagination
            count={30}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />

          <Button className="game-btn" onClick={() => navigate("/audion-call")}>
            AUDIOCALL
          </Button>
          <Button className="game-btn" onClick={() => navigate("/sprint")}>
            SPRINT
          </Button>
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
              return <Word key={word.id} card={word} />;
            })}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Dictionary;
