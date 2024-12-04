import React, { useContext } from 'react';
import { ConfigContext } from 'contexts/ConfigContext';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import { ThemeMode } from 'config';

export default function ThemeModeToggle() {
  let { mode, onChangeMode } = useContext(ConfigContext);

  const handleToggle = () => {
    if (mode == ThemeMode.DARK) {
      mode = ThemeMode.LIGHT;
    } else {
      mode = ThemeMode.DARK;
    }
    console.log('Toggling to:', mode);
    onChangeMode(mode);
  };

  return (
    <FormGroup>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Tooltip title={mode === ThemeMode.DARK ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <Switch onChange={handleToggle} inputProps={{ 'aria-label': 'light/dark mode switch' }} />
        </Tooltip>
      </Stack>
    </FormGroup>
  );
}
