import { Box, Button, Pagination, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IWordCard } from "../../interfaces";
import { ServiceDictionary } from "../../services/dictionary-service";
import "./dictionary.css";
import Word from "./word";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="content-wrap">
      <div className="content-dictionary">
        <h2 className="main-title">Dictionary</h2>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="ALL WORDS" {...a11yProps(0)} />
            <Tab label="DIFFICULT WORDS" {...a11yProps(1)} />
            <Tab label="LEARNED WORDS" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
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

            <Button
              className="game-btn"
              onClick={() => navigate("/audion-call")}
            >
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
        </TabPanel>
        <TabPanel value={value} index={1}>
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

            <Button
              className="game-btn"
              onClick={() => navigate("/audion-call")}
            >
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
                if (word.difficult) return <Word key={word.id} card={word} />;
              })}
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    </div>
  );
};

export default Dictionary;
