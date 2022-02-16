import { useEffect, useState } from 'react';
import { useKey } from 'react-keyboard-hooks'
import { useSound } from 'use-sound';

import { Card, CardActions, CardContent, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { changeWord, getWord, getWords, setWord, getUserWords } from '../../../services/sprint-service';
import PageSprintSettings from './page-sprint-settings/page-sprint-settings';
import PageResult from './page-result/page-result';
import { IUserWord, IWordCard, IUserInfo } from '../../../interfaces';

import './sprint.css';

const GameSprint = () => {
  const [difficulty, setDifficulty] = useState('1');
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isStart, setIsStart] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [dataWords, setDataWords] = useState<IWordCard[] | null>(null);
  const [numberCurrentPage, setNumberCurrentPage] = useState<number>(0);
  const [numberCurrentWord, setNumberCurrentWord] = useState<number>(0);
  const [seconds, setSeconds] = useState(61);
  const [numbersPageList, setNumbersPageList] = useState<number[]>([]);
  const [numbersWordList, setNumbersWordList] = useState<number[]>([]);
  const [arrAnswers, setArrAnswers] = useState<number[]>([10, 15]);
  const [numberAnswer, setNumberAnswer] = useState<number>(0);
  const [userWordsList, setUserWordsList] = useState<IUserWord[]>([]);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const correct = require('../../../resources/correct.mp3');
  const incorrect = require('../../../resources/incorrect.mp3');
  const [cor] = useSound(correct);
  const [inCor] = useSound(incorrect);

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
      userInfo ? setIsSignIn(true) : setIsSignIn(false);
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
  }, [isFinished]);

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
    afterSelect(answer);
  };

  const onSelectByKey = (str: string) => {
    const answer = (numberCurrentWord === numberAnswer && str === "right")
      || (numberCurrentWord !== numberAnswer && str === "wrong");
    afterSelect(answer);
  };


  const afterSelect = (answer: boolean) => {
    answer ? cor() : inCor();
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
          }
        }])
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
  }

  useKey('ArrowLeft', () => onSelectByKey('right'));
  useKey('ArrowRight', () => onSelectByKey('wrong'));

  const addUserWord = (answer: boolean) => {
    if (userInfo && dataWords) {
      getWord((userInfo as IUserInfo).userId, String((dataWords[numberCurrentWord] as IWordCard).id), (userInfo as IUserInfo).token)
        .then(() => changeWord((userInfo as IUserInfo).userId, String((dataWords[numberCurrentWord] as IWordCard).id), {
          difficulty: difficulty,
          optional: {
            sprint: answer
          }
        }, (userInfo as IUserInfo).token))
        .catch((error) => {
          if (Number(error.message) === 404) {
            setWord((userInfo as IUserInfo).userId, String((dataWords[numberCurrentWord] as IWordCard).id), {
              difficulty: difficulty,
              optional: {
                sprint: answer
              }
            }, (userInfo as IUserInfo).token);
          } else if (Number(error.message) === 401) {
            localStorage.clear();
            setIsSignIn(false)
          };
        });
    };
  };

  const userWordsLoading = () => {
    if (userInfo) {
      getUserWords((userInfo as IUserInfo).userId, (userInfo as IUserInfo).token)
        .then((res) => setUserWordsList(res))
        .catch((error) => console.log(error));
    };
  };

  const PageSprint = () => {
    if (dataWords) {
      return (
        <div className='content-wrap wrapper-sprint-page'>
          <div className='content-sprint-page'>
            <Card className='field-sprint'>
              <CardContent className='field-sprint-content'>
                <div>{seconds}</div>
                <Typography sx={{ mb: 1.5, fontWeight: '900', fontSize: 50, }} >
                  {(dataWords[numberCurrentWord] as IWordCard).word}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {(dataWords[numberAnswer] as IWordCard).wordTranslate}
                </Typography>
              </CardContent>
              <CardActions className='field-sprint-buttons'>
                <button data-name="right" onClick={onSelect}><ArrowBackIcon />Right</button>
                <button data-name="wrong" onClick={onSelect}>Wrong<ArrowForwardIcon /></button>
              </CardActions>
            </Card>
          </div>
        </div >
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
