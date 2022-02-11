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
  Typography
} from '@mui/material';

import { ServiceDictionary } from '../../../services/sprint-service';

import './sprint.css';


const GameSprint = () => {
  const [difficulty, setDifficulty] = useState('');
  const [isStart, setIsStart] = useState(false);

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 30);
  }

  useEffect(() => {
    if (isStart) {
      getWords();
    }
  }, []);

  const onLoading = () => {
    getWords();
  }

  const getWords = () => {
    ServiceDictionary.getWords(getRandomNumber(), (Number(difficulty) - 1))
      .then((res) => console.log(res))
  };

  const handleChange = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as string);
  };

  const onStart = () => {
    setIsStart(true);
  };

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
            onLoading();
          }}>
            START
          </Button>
        </div>
      </div>
    )
  }

  const PageSprint = () => {
    return (
      <div className="field-sprint">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Right</Button>
            <Button size="small">Wrong</Button>
          </CardActions>
        </Card>
      </div>
    )
  }

  const content = !isStart ? <PageSprintSettings /> : <PageSprint />;

  return (
    <>
      {content}
    </>
  );
};

export default GameSprint;
