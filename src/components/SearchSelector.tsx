import { Stack, Button, ButtonGroup } from '@mui/material';

export default function SearchSelector({
  // initialValue,
  onClick
}: {
  // initialValue: number;
  onClick: (event: React.MouseEvent<HTMLElement>, newPriority: number) => void;
}) {
  return (
    <Stack direction="column" spacing={2} justifyContent="center">
      <ButtonGroup sx={{justifyContent:"center"}}>
        <Button value={1} onClick={(event) => onClick(event, 1)}>
          Title
        </Button>
        <Button value={2} onClick={(event) => onClick(event, 2)}>
          Author
        </Button>
        <Button value={3} onClick={(event) => onClick(event, 3)}>
          Year
        </Button>
        <Button value={4} onClick={(event) => onClick(event, 4)}>
          ISBN
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
