import { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { PageSprintSettingsProps } from '../../../../types';

import './page-sprint-settings.css';

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
    <div className='content-wrap wrapper-sprint-settings'>
      <h2 className='sprint-title'>Sprint</h2>
      <p className='sprint-info'>"Sprint" is a practice for repeating memorized words from your dictionary.</p>
      <ul className='sprint-setting-instruction'>
        <li>You can use the mouse to select.</li>
        <li>You can use the left or right keys</li>
      </ul>
      <div className='content-sprint-settings'>
        <Box sx={{ width: 150 }}>
          <FormControl fullWidth variant='standard'>
            <InputLabel id='demo-simple-select-label' sx={{ color: '#ffffff', fontWeight: '900' }}>difficulty</InputLabel>
            <Select sx={{ fontSize: '30px', color: '#ffffff', fontWeight: '900' }}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={difficulty}
              label='setDifficulty'
              onChange={handleChange}>
              <MenuItem value='1'>1</MenuItem>
              <MenuItem value='2'>2</MenuItem>
              <MenuItem value='3'>3</MenuItem>
              <MenuItem value='4'>4</MenuItem>
              <MenuItem value='5'>5</MenuItem>
              <MenuItem value='6'>6</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button className='button-start' sx={{ color: '#ffffff', fontWeight: '900', fontSize: '20px', border: '5px solid' }} size='large' onClick={onStart}>
          START
        </Button>
      </div>
    </div>
  );
};

export default PageSprintSettings;