import { useEffect, useRef, useState } from 'react';
import { useKey } from 'react-keyboard-hooks'
import { useSound } from 'use-sound';

import { Button, CardActions, CardContent, IconButton } from '@mui/material';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import { changeWord, getWord, getWords, setWord, getUserWords } from '../../../services/sprint-service';
import PageAudioCallSettings from './page-audio-call-settings/page-settings-audio-call';
import PageResultAudioCall from './page-result-audio-call/page-result-audio-call';
import { IUserWord, IWordCard, IUserInfo } from '../../../interfaces';
import { baseURL } from '../../../constants';

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
  const [arrAnswers, setArrAnswers] = useState<number[]>([]);
  const [numberAnswer, setNumberAnswer] = useState<number | null>(null);
  const [userWordsList, setUserWordsList] = useState<IUserWord[]>([]);
  const [togglerDisplayButtons, setTogglerDisplayButtons] = useState<Boolean>(false);

  const correct = require('../../../resources/correct.mp3');
  const incorrect = require('../../../resources/incorrect.mp3');
  const [cor] = useSound(correct);
  const [inCor] = useSound(incorrect);
  const itemRefs = useRef<HTMLButtonElement[]>([]);
  const audio = new Audio();

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

  const shuffle = (array: number[]) => {
    return array.sort(() => Math.random() - 0.5);
  }

  const onStart = (difficulty: string, isStart: boolean) => {
    setDifficulty(difficulty);
    setIsStart(isStart);
  }

  useEffect(() => {
    if (isStart) {
      getData();
    }
  }, [isStart]);

  useEffect(() => {
    setNumberCurrentWord(getRandomNumberWord(0, 20));
    getLocalStorage();
    userInfo ? setIsSignIn(true) : setIsSignIn(false);
  }, [dataWords])

  useEffect(() => {
    if (numberAnswer || numberAnswer === 0) {
      numberCurrentWord === numberAnswer ? cor() : inCor();
      focusOnItem();
    }
  }, [numberAnswer])
  
  useEffect(() => {
    setArrAnswers([]);
    setArrAnswers((arrAnswers) => ([...arrAnswers, numberCurrentWord]));
    for (let i = 0; i < 8; i++) {
      setArrAnswers((arrAnswers) => {
        const randomNum = Math.floor(Math.random() * 20);
        if (!arrAnswers.includes(randomNum) && arrAnswers.length < 5) {
          return [...arrAnswers, randomNum]
        } else return [...arrAnswers]
      });
    }
    setArrAnswers((arrAnswers) => (shuffle(arrAnswers)));
    playAudio();
  }, [numberCurrentWord]);

  useEffect(() => {
    if (isFinished && !isLoading) {
      userWordsLoading();
    }
  }, [isFinished, isLoading]);

  useEffect(() => {
    if (isLoading) {
      addUserWord();
    }
  }, [isLoading])

  useEffect(() => {
    if (togglerDisplayButtons) {
      focusOnItem();
    }
  }, [togglerDisplayButtons])

  const getData = () => {
    if (numbersPageList.length < 30) {
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

  const playAudio = async () => {
    audio.pause();
    if (dataWords) {
      const res = await fetch(`${baseURL}${(dataWords[numberCurrentWord] as IWordCard).audio}`);
      audio.src = `${res.url}`;
      audio.play();
    }
  }

  const focusOnItem = () => {
    if (numberAnswer || numberAnswer === 0) {
      itemRefs.current.forEach((element) => {
        if (numberAnswer === numberCurrentWord) {
          itemRefs.current[numberCurrentWord].classList.add('audio-call-text-button-right');
        } else if (numberAnswer !== numberCurrentWord) {
          itemRefs.current[numberCurrentWord].classList.add('audio-call-text-button-right');
          itemRefs.current[numberAnswer].classList.add('audio-call-text-button-wrong');
        }
        element.classList.add('audio-call-text-button-another');
        element.disabled = true;
      });
    } else {
      itemRefs.current.forEach((element) => {
        element !== itemRefs.current[numberCurrentWord] ?
          element.classList.add('audio-call-text-button-another') :
          itemRefs.current[numberCurrentWord].classList.add('audio-call-text-button-right');
        element.disabled = true;
      })
    }
  };

  const addUserWord = () => {
    if (userInfo && dataWords) {      
      getWord((userInfo as IUserInfo).userId, String((dataWords[numberCurrentWord] as IWordCard).id), (userInfo as IUserInfo).token)
        .then((res) => {
          changeWord((userInfo as IUserInfo).userId, String((dataWords[numberCurrentWord] as IWordCard).id), {
            difficulty: difficulty,
            optional: {
              ...res.data.optional, largestSeriesCorAnswAC: 'label',
              game: {
                ...res.data.optional.game, audioCall: `${numberCurrentWord === numberAnswer}`,
              },
            }
          }, (userInfo as IUserInfo).token)
        })
        .catch((error) => {
          if (Number(error.message.slice(-3)) === 404) {
            setWord((userInfo as IUserInfo).userId, String((dataWords[numberCurrentWord] as IWordCard).id), {
              difficulty: difficulty,
              optional: {
                game: {
                  audioCall: `${numberCurrentWord === numberAnswer}`
                },
                largestSeriesCorAnswAC: 'label',
              }
            }, (userInfo as IUserInfo).token)
          };
        });
    };
    setIsLoading(false);
  };

  const setDataUserWord = () => {
    if (isSignIn) {
      setIsLoading(true);
      addUserWord();
    } else {
      if (dataWords && dataWords.length > 0) {
        setUserWordsList((userWordsList) => [...userWordsList, {
          id: '',
          difficulty: `${difficulty}`,
          wordId: `${dataWords[numberCurrentWord].id}`,
          optional: {
            game: {
              audioCall: `${numberCurrentWord === numberAnswer}`
            }
          }
        }])
      }
    }
  }

  const onNext = () => {
    setDataUserWord();
    if (numbersWordList.length < 20) {
      setNumberCurrentWord(getRandomNumberWord(0, 20));
      setNumberAnswer(null);
    } else {
      setIsFinished(true);
    };
  }

  const onDiscover = () => {
    focusOnItem();
    setTogglerDisplayButtons(false);
  }

  const onHidden = (b: Boolean) => {
    setTogglerDisplayButtons(b);
  }

  const userWordsLoading = () => {
    if (userInfo) {
      getUserWords((userInfo as IUserInfo).userId, (userInfo as IUserInfo).token)
        .then((res) => setUserWordsList(res.data))
        .catch((error) => console.log(error));
    };
  };

  const onSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNumberAnswer(Number(event.currentTarget.dataset.number as string));
  };

  const PageAudioCall = () => {
    if (dataWords) {
      return (
        <div className='content-wrap wrapper-pages-games wrapper-audio-call-game'>
          <CardContent className='field-audio-call-content'>
            <IconButton
              className='audio-call-speaker'
              size="large"
              sx={{
                width: 100,
                height: 100,
                color: '#ffffff',
                marginBottom: '60px'
              }}
              onClick={playAudio}>
              <VolumeUpOutlinedIcon fontSize='large' sx={{ width: 60, height: 60 }} />
            </IconButton>
            <ul className='audio-call-answer-list'>
              {arrAnswers.map((item, i) => {
                return <li key={i} className='audio-call-answer-item'>
                  <Button
                    data-number={item}
                    ref={(el) => {
                      return el ? itemRefs.current[item] = el : null
                    }}
                    className='audio-call-text-button'
                    variant="text"
                    onClick={(event) => { onSelect(event); onHidden(true) }}
                  >
                    {++i} {(dataWords[item] as IWordCard).wordTranslate}
                  </Button>
                </li>
              })}
            </ul>
          </CardContent>
          <CardActions className='field-audio-call-buttons'>
            <Button
              variant="outlined"
              style={{ display: !togglerDisplayButtons ? 'flex' : 'none' }}
              onClick={() => { onDiscover(); onHidden(true); inCor() }}>I don't know</Button>
            <Button
              variant="outlined"
              style={{ display: togglerDisplayButtons ? 'flex' : 'none' }}
              onClick={() => { onNext(); onHidden(false); }}
            >
              <ArrowRightAltIcon fontSize='medium' />
            </Button>
          </CardActions>
        </div >
      )
    } else return null;
  }

  const pageSettings = !isStart ? <PageAudioCallSettings onStart={onStart} /> : null;
  const pageGame = dataWords && !isFinished && !isLoading ? <PageAudioCall /> : null;
  const pageResult = isFinished && !isLoading ?
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