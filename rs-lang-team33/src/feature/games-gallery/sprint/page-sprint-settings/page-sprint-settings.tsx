import { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { PageSprintSettingsProps } from '../../../../types';

const PageSprintSettings = (props: PageSprintSettingsProps) => {
  const [isStart, setIsStart] = useState(false);
  const [difficulty, setDifficulty] = useState('1');

  const handleChange = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as string);
  };

  const onStart = () => {
    const { onStart } = props;
    setIsStart(true);
    onStart(difficulty, isStart);
  };

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
        <Button variant="outlined" size="medium" onClick={onStart}>
          START
        </Button>
      </div>
    </div>
  );
};

export default PageSprintSettings;