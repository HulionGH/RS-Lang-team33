import { useEffect, useState } from 'react';
import { useKey } from 'react-keyboard-hooks'
import { useSound } from 'use-sound';

import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { changeWord, getWord, getWords, setWord, getUserWords } from '../../../services/sprint-service';
import PageAudioCallSettings from './page-audio-call-settings/page-settings-audio-call';
import PageResultAudioCall from './page-result-audio-call/page-result-audio-call';
import { IUserWord, IWordCard, IUserInfo } from '../../../interfaces';

import "./audio-call.css";

const GameAudioCall = () => {
  const [difficulty, setDifficulty] = useState('1');
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isStart, setIsStart] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [dataWords, setDataWords] = useState<IWordCard[] | null>(null);
  const [numberCurrentPage, setNumberCurrentPage] = useState<number>(0);
  const [numberCurrentWord, setNumberCurrentWord] = useState<number>(0);
  const [numbersPageList, setNumbersPageList] = useState<number[]>([]);
  const [numbersWordList, setNumbersWordList] = useState<number[]>([]);
  const [arrAnswers, setArrAnswers] = useState<number[]>([10, 15]);
  const [numberAnswer, setNumberAnswer] = useState<number>(0);
  const [userWordsList, setUserWordsList] = useState<IUserWord[]>([]);

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

  const onStart = (difficulty: string, isStart: boolean) => {
    setDifficulty(difficulty);
    setIsStart(isStart);
  }

  useEffect(() => {
    console.log("hello");
    
    if (isStart) {
      setNumberCurrentWord(getRandomNumberWord(0, 20));
      getData();
      getLocalStorage();
      userInfo ? setIsSignIn(true) : setIsSignIn(false);
    }
  }, [isStart]);

  const shuffle = (array: number[]) => {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      setArrAnswers((arrAnswers) => ([...arrAnswers, Math.floor(Math.random() * 20)]));
    }
    setArrAnswers((arrAnswers) => ([...arrAnswers, numberCurrentWord]));
    setArrAnswers((arrAnswers) => (shuffle(arrAnswers)));
  }, [numberCurrentWord]);

  const getData = () => {
    if (numbersWordList.length < 30) {
      setNumberCurrentPage(() => getRandomNumberPage(0, 30));
    }
    setIsLoading(true);

    getWords(numberCurrentPage, (Number(difficulty) - 1))
      .then((res) => {
        setDataWords(res.data);
        setIsLoading(false);
      });
  };

  const getLocalStorage = () => {
    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
      setUserInfo(userInfo);
    };
  };

  const onSelect = () => {
  };

  const PageAudioCall = () => {
    if (dataWords) {
      return (
        <div className='content-wrap wrapper-pages-games wrapper-audio-call-game'>
          <CardContent className='field-audio-call-content'>
            <IconButton
              className='audio-call-speaker'
              size="large"
              sx={{ width: 100, height: 100, backgroundColor: 'rgb(124, 119, 119)', color: '#ffffff' }}>
              <VolumeUpOutlinedIcon fontSize='large' sx={{ width: 60, height: 60 }} />
            </IconButton>
            {arrAnswers.map((item, i) => {
              return <li key={i}> 
                {(dataWords[item] as IWordCard).wordTranslate}
              </li>
            })}

          </CardContent>
          <CardActions className='field-audio-call-buttons'>
            <Button variant="outlined" onClick={onSelect}>I don't know</Button>
            <Button variant="outlined"><ArrowRightAltIcon fontSize='medium' /></Button>
          </CardActions>
        </div >
      )
    } else return null;
  }

  const pageSettings = !isStart ? <PageAudioCallSettings onStart={onStart} /> : null;
  const pageGame = !(isLoading) ? <PageAudioCall /> : null; // || !dataWords
  const pageResult = isFinished ?
    <PageResultAudioCall
      userWordsList={userWordsList}
      difficulty={difficulty}
      dataWords={dataWords} /> : null;

  return (
    <>
      {pageSettings}
      {pageGame}
      {pageResult}
    </>
  );
};

export default GameAudioCall;
