'use client';

import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent } from '@mui/material';
import BookView from 'components/BookView';
import { useState, useEffect } from 'react';
import { IBook } from 'types/books';

import axios from 'utils/axios';

type PaginationData = {
  limit: number;
  nextPage: number;
  offset: number;
  totalRecords: string; // don't know why this is a string but it is.
};

const initialPaginationData: PaginationData = {
  limit: 10,
  nextPage: 0,
  offset: 0,
  totalRecords: '0'
};

export default function BookBrowse() {
  const [results, setResults] = useState<IBook[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [pagination, setPagination] = useState<PaginationData>(initialPaginationData);

  useEffect(() => {
    const route = `/book/all?limit=${limit}&offset=${(page - 1) * limit}`;
    axios
      .get(route)
      .then((response) => {
        console.log(response);
        setResults(response.data.entries.map((entry: { id: number; IBook: IBook }) => entry.IBook));
        setPagination(response.data.pagination);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page, limit]);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="select-limit-label">Results per page</InputLabel>
        <Select
          labelId="select-limit-label"
          id="select-limit"
          value={limit as unknown as string}
          label="Age"
          onChange={(event: SelectChangeEvent) => {
            setPage(1);
            setLimit(event.target.value as unknown as number);
          }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>
      {results.map((book) => (
        <BookView key={book.isbn13} book={book} />
      ))}
      <Pagination
        variant="outlined"
        page={page}
        count={Math.ceil(parseInt(pagination.totalRecords) / pagination.limit)}
        color="primary"
        size="large"
        onChange={(_, value) => setPage(value)}
      />
    </>
  );
}
