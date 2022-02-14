import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  List,
  ListSubheader,
  Stack,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import { changeWord, getWord, getWords, setWord, getUserWords } from '../../../services/sprint-service';
import { userInfo } from '../../login/login-page';
import './sprint.css';

export type wordInfo = {
  audio: string,
  audioExample: string,
  audioMeaning: string,
  group: number,
  id: number,
  image: string,
  page: number,
  textExample: string,
  textExampleTranslate: string,
  textMeaning: string,
  textMeaningTranslate: string,
  transcription: string,
  word: string,
  wordTranslate: string,
};

export type userWords = {
  id: string,
  difficulty: string,
  wordId: string,
  optional: {
    sprint?: string,
    audioCall?: string
  }
}

const GameSprint = () => {
  const [difficulty, setDifficulty] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [dataWords, setDataWords] = useState<wordInfo[] | null>(null);
  const [numberCurrentPage, setNumberCurrentPage] = useState<number>(0);
  const [numberCurrentWord, setNumberCurrentWord] = useState<number>(0);
  const [seconds, setSeconds] = useState(61);
  const [numbersPageList, setNumbersPageList] = useState<number[]>([]);
  const [numbersWordList, setNumbersWordList] = useState<number[]>([]);
  const [arrAnswers, setArrAnswers] = useState<number[]>([10, 15]);
  const [numberAnswer, setNumberAnswer] = useState<number>(0);
  const [userWordsList, setUserWordsList] = useState<userWords[]>([]);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const getRandomNumberPage: (min: number, max: number) => number = (min, max) => {
    let numb: number;
    numb = Math.floor(min + Math.random() * (max - min));
    if (numbersPageList.includes(numb)) return getRandomNumberPage(min, max);
    else { setNumbersPageList((numbersPageList) => [...numbersPageList, numb]) }
    return numb;
  };

  const getRandomNumberWord: (min: number, max: number) => number = (min, max) => {
    let numb: number;
    numb = Math.floor(min + Math.random() * (max - min));

    if (numbersWordList.includes(numb)) return getRandomNumberWord(min, max);
    else { setNumbersWordList((numbersWordList) => [...numbersWordList, numb]) }
    return numb;
  };

  useEffect(() => {
    if (isStart) {
      setNumberCurrentWord(getRandomNumberWord(0, 20));
      getData();
      getLocalStorage();
    }
  }, [isStart]);

  useEffect(() => {
    setArrAnswers([Math.floor(Math.random() * 20), numberCurrentWord]);
  }, [numberCurrentWord]);

  useEffect(() => {
    setNumberAnswer(arrAnswers[Math.floor(Math.random() * 2)]);
  }, [arrAnswers]);

  useEffect(() => {
    if (isFinished) {
      userWordsLoading();
    }
  }, [isFinished])

  const countdown = () => {
    const timeoutId = setTimeout(() => {
      countdown();
    }, 1000)
    setTimerId(timeoutId);
    setSeconds((seconds) => {
      if (seconds > 0) {
        return (seconds - 1);
      } else {
        setIsFinished(true);
        setIsLoading(true);
        if (timerId) {
          clearTimeout(timerId);
        }
        return 0;
      };
    });
  };

  const getData = () => {
    if (numbersWordList.length < 30) {
      setNumberCurrentPage(() => getRandomNumberPage(0, 30));
    }
    setIsLoading(true);

    getWords(numberCurrentPage, (Number(difficulty) - 1))
      .then((res) => {
        setDataWords(res);
        setIsLoading(false);
        countdown();
      });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as string);
  };

  const onStart = () => {
    setIsStart(true);
  };

  const getLocalStorage = () => {
    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
      setUserInfo(userInfo);
    };
  };

  const onSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    addUserWord((numberCurrentWord === numberAnswer && event.currentTarget.dataset.name === "right")
      || (numberCurrentWord !== numberAnswer && event.currentTarget.dataset.name === "wrong"));

    if (numbersWordList.length < 20) {
      setNumberCurrentWord(getRandomNumberWord(0, 20));
    } else {
      setIsFinished(true);
      setIsLoading(true);
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  };

  const addUserWord = (answer: boolean) => {
    if (userInfo && dataWords) {
      getWord((userInfo as userInfo).userId, String((dataWords[numberCurrentWord] as wordInfo).id), (userInfo as userInfo).token)
        .then(() => changeWord((userInfo as userInfo).userId, String((dataWords[numberCurrentWord] as wordInfo).id), {
          difficulty: difficulty,
          optional: {
            sprint: answer
          }
        }, (userInfo as userInfo).token))
        .catch((error) => {
          if (Number(error.message) === 404) {
            setWord((userInfo as userInfo).userId, String((dataWords[numberCurrentWord] as wordInfo).id), {
              difficulty: difficulty,
              optional: {
                sprint: answer
              }
            }, (userInfo as userInfo).token);
          };
        });
    };
  };

  const userWordsLoading = () => {
    if (userInfo) {
      getUserWords((userInfo as userInfo).userId, (userInfo as userInfo).token)
        .then((res) => setUserWordsList(res))
        .catch((error) => console.log(error));
    };
  };
  
  const audio = new Audio();
  const startAudio = async (event: React.MouseEvent<SVGSVGElement>) => {
    audio.pause()
    const curWord = dataWords?.filter((item) => String(item.id) === (event.currentTarget.dataset.id as string));
    if (curWord) {
      const res = await fetch(`https://react-learnwords-example.herokuapp.com/${curWord[0].audio}`);
      audio.src = `${res.url}`;
      audio.play();
    }
  }

  const PageSprintSettings = () => {
    return (
      <div className="content-wrap">
        <div className="content-games-sprint">
          <h2>Sprint</h2>
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">difficulty</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={difficulty}
                label="setDifficulty"
                onChange={handleChange}>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="outlined" size="medium" onClick={() => {
            onStart();
          }}>
            START
          </Button>
        </div>
      </div>
    )
  }

  const PageSprint = () => {
    if (dataWords) {
      return (
        <div className="field-sprint">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <div>{seconds}</div>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {(dataWords[numberCurrentWord] as wordInfo).word}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {(dataWords[numberAnswer] as wordInfo).wordTranslate}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" data-name="right" onClick={onSelect}>Right</Button>
              <Button size="small" data-name="wrong" onClick={onSelect}>Wrong</Button>
            </CardActions>
          </Card>
        </div>
      )
    } else return null;
  }

  const PageResult = () => {
    let wordRightInfo: Array<wordInfo[]> = [];
    let wordWrongInfo: Array<wordInfo[]> = [];

    const currentDifficultyRightAnswers = userWordsList.filter((item) => item.difficulty === difficulty
      && (String(item.optional.sprint) === 'true'));
    const currentDifficultyWrongAnswers = userWordsList.filter((item) => item.difficulty === difficulty
      && (String(item.optional.sprint) === 'false'));
    currentDifficultyRightAnswers.map((item) => wordRightInfo.push((dataWords as wordInfo[])
      .filter((i) => String(i.id) === item.wordId)))
    currentDifficultyWrongAnswers.map((item) => wordWrongInfo.push((dataWords as wordInfo[])
      .filter((i) => String(i.id) === item.wordId)))

    return (
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 500,
          margin: '0 auto',
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        <h5>right</h5>
        {wordRightInfo.flat().map((item, index) => {
          return (
            <li key={`${index}`}>
              <Stack direction="row" alignItems="center">
                <VolumeUpIcon data-id={item.id} onClick={startAudio} />
                {<ListSubheader>{`${item.word} - ${item.wordTranslate}`}</ListSubheader>}
              </Stack>
            </li>
          )
        })}
        <h5>wrong</h5>
        {wordWrongInfo.flat().map((item, index) => {
          return (
            <li key={`${index}`}>
              <Stack direction="row" alignItems="center">
                <VolumeUpIcon data-id={item.id} onClick={startAudio} />
                {<ListSubheader>{`${item.word} - ${item.wordTranslate}`}</ListSubheader>}
              </Stack>
            </li>
          )
        })}
      </List>

    )
  }

  const pageSettings = !isStart ? <PageSprintSettings /> : null;
  const pageGame = !(isLoading || !dataWords) ? <PageSprint /> : null;
  const pageResult = userWordsList.length > 0 ? <PageResult /> : null;

  return (
    <>
      {pageSettings}
      {pageGame}
      {pageResult}
    </>
  );
};

export default GameSprint;
