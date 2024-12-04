import { FormControl, InputLabel, NativeSelect } from '@mui/material';

export default function SearchSelector({
  onClick
}: {
  onClick: (event: React.ChangeEvent<HTMLElement>, newPriority: number) => void;
}) {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = Number(event.target.value);
    onClick(event, newValue);
  }

  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="search-method">
        Search by
      </InputLabel>
      <NativeSelect
        defaultValue={1}
        onChange={handleChange}
        inputProps={{
          name: 'Search by',
          id: 'search-method',
        }}
      >
        <option value={1}>Title</option>
        <option value={2}>Author</option>
        <option value={3}>Publication year</option>
        <option value={4}>ISBN</option>
      </NativeSelect>
    </FormControl>
  );
}