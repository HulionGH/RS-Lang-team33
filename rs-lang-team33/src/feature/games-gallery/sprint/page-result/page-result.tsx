import { useEffect, useState } from 'react';

import { List, ListSubheader, Stack } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import { PageResultProps, userWords, wordInfo } from '../../../../types';
import { baseURL } from '../../../../constants';

const PageResult = (props: PageResultProps) => {
  const [userWordsList, setUserWordsList] = useState<userWords[]>([]);
  const [difficulty, setDifficulty] = useState('1');
  const [dataWords, setDataWords] = useState<wordInfo[] | null>(null);

  useEffect(() => {
    const { userWordsList, difficulty, dataWords } = props;
    setUserWordsList(userWordsList);
    setDifficulty(difficulty);
    setDataWords(dataWords)
  }, [])

  const audio = new Audio();
  const startAudio = async (event: React.MouseEvent<SVGSVGElement>) => {
    audio.pause()
    const curWord = dataWords?.filter((item) => String(item.id) === (event.currentTarget.dataset.id as string));
    if (curWord) {
      const res = await fetch(`${baseURL}${curWord[0].audio}`);
      audio.src = `${res.url}`;
      audio.play();
    }
  }

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
      subheader={<div />}
    >
      <h5>right</h5>
      {wordRightInfo.flat().map((item, index) => {
        return (
          <div key={`${index}`}>
            <Stack direction="row" alignItems="center">
              <VolumeUpIcon data-id={item.id} onClick={startAudio} />
              {<ListSubheader>{`${item.word} - ${item.wordTranslate}`}</ListSubheader>}
            </Stack>
          </div>
        )
      })}
      <h5>wrong</h5>
      {wordWrongInfo.flat().map((item, index) => {
        return (
          <div key={`${index}`}>
            <Stack direction="row" alignItems="center">
              <VolumeUpIcon data-id={item.id} onClick={startAudio} />
              {<ListSubheader>{`${item.word} - ${item.wordTranslate}`}</ListSubheader>}
            </Stack>
          </div>
        )
      })}
    </List>
  );
};

export default PageResult;