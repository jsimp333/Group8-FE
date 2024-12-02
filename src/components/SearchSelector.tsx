import { Stack, Button, ButtonGroup } from '@mui/material';

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
      <ButtonGroup variant="text">
        <Button value={1} onClick={(event) => onClick(event, 1)}>
          <SearchMethod method={1} />
        </Button>
        <Button value={2} onClick={(event) => onClick(event, 2)}>
          <SearchMethod method={2} />
        </Button>
        <Button value={3} onClick={(event) => onClick(event, 3)}>
          <SearchMethod method={3} />
        </Button>
        <Button value={4} onClick={(event) => onClick(event, 4)}>
          <SearchMethod method={4} />
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
