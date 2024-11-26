import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

import SearchMethod from './SearchMethod';

export default function SearchSelector({
  initialValue,
  onClick
}: {
  initialValue: number;
  onClick: (event: React.MouseEvent<HTMLElement>, newPriority: number) => void;
}) {
  return (
    <Stack direction="column" spacing={2} justifyContent="center">
      <ToggleButtonGroup exclusive value={initialValue} onChange={onClick}>
        <ToggleButton value={1}>
          <SearchMethod method={1} />
        </ToggleButton>
        <ToggleButton value={2}>
          <SearchMethod method={2} />
        </ToggleButton>
        <ToggleButton value={3}>
          <SearchMethod method={3} />
        </ToggleButton>
        <ToggleButton value={4}>
          <SearchMethod method={4} />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
