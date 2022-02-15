import { useEffect, useState } from 'react';

import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

import { changeWord, getWord, getWords, setWord, getUserWords } from '../../../services/sprint-service';
import { userInfo } from '../../../types';
import PageSprintSettings from './page-sprint-settings/page-sprint-settings';
import PageResult from './page-result/page-result';
import { userWords, wordInfo } from '../../../types';

import './sprint.css';

const GameSprint = () => {
  const [difficulty, setDifficulty] = useState('1');
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isStart, setIsStart] = useState(false);
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
    getLocalStorage();
    userInfo ? setIsSignIn(true) : setIsSignIn(false);
  }, [])

  const onStart = (difficulty: string, isStart: boolean) => {
    setDifficulty(difficulty);
    setIsStart(isStart);
  }

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
    if (isFinished && timerId) {
      userWordsLoading();
      clearTimeout(timerId);
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

  const getLocalStorage = () => {
    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
      setUserInfo(userInfo);
    };
  };

  const onSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const answer = (numberCurrentWord === numberAnswer && event.currentTarget.dataset.name === "right")
    || (numberCurrentWord !== numberAnswer && event.currentTarget.dataset.name === "wrong");
    if (isSignIn) {
      addUserWord(answer);
    } else {
      if (dataWords && dataWords.length > 0) {
        setUserWordsList((userWordsList) => [...userWordsList, {
          id: '',
          difficulty: `${difficulty}`,
          wordId: `${dataWords[numberCurrentWord].id}`,
          optional: {
            sprint: `${answer}`
        }}])
      }
    }


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
          } else if (Number(error.message) === 401) {
            localStorage.clear();
            setIsSignIn(false)
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

  const PageSprint = () => {
    if (dataWords) {
      return (
        <div className='content-wrap wrapper-sprint-page'>
          <div className='content-sprint-pape'>
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
          </div>
        </div>

      )
    } else return null;
  }

  const pageSettings = !isStart ? <PageSprintSettings onStart={onStart} /> : null;
  const pageGame = !(isLoading || !dataWords) ? <PageSprint /> : null;
  const pageResult = isFinished ? <PageResult userWordsList={userWordsList} difficulty={difficulty} dataWords={dataWords} /> : null;

  return (
    <>
      {pageSettings}
      {pageGame}
      {pageResult}
    </>
  );
};

export default GameSprint;
