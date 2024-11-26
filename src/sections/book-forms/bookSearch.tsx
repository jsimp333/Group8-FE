'use client';

import React, { useState } from 'react';

// next

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import SearchSelector from 'components/SearchSelector';

import axios from 'utils/axios';
import { IBookResponse } from 'types/books';

const initialValues = {
  searchValue: '',
  submit: null
};

export default function SearchBook({ onSuccess, onError }: { onSuccess: (q: IBookResponse[]) => void; onError: (msg: string) => void }) {
  const [searchMethod, setSearchMethod] = useState(1);

  const searchMethods: Record<number, { label: string; apiPath: string }> = {
    1: { label: 'Title', apiPath: '/book/title/' },
    2: { label: 'Author', apiPath: '/book/author/' },
    3: { label: 'Year', apiPath: '/book/year/' },
    4: { label: 'ISBN', apiPath: '/book/isbn/' }
  };

  const currentMethod = searchMethods[searchMethod];

  return (
    <>
      <Stack spacing={3} sx={{ mb: 2 }}>
        <SearchSelector initialValue={searchMethod} onClick={(_, newMethod) => setSearchMethod(newMethod)} />
      </Stack>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          searchValue: Yup.string().max(255, `${currentMethod.label} is too long`).required(`${currentMethod.label} is required`)
        })}
        onSubmit={(values, { setErrors, setSubmitting, resetForm }) => {
          const route = `${currentMethod.apiPath}${values.searchValue}`;

          axios
            .get(route)
            .then((response) => {
              setSubmitting(false);
              //   resetForm({ values: initialValues });
              console.log(response)
              onSuccess(response.data.entries as IBookResponse[]);
            })
            .catch((error) => {
              console.error(error);
              setErrors({ searchValue: error.message });
              setSubmitting(false);
              onError(error.message);
            });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="search-value">
                    Enter {currentMethod.label.charAt(0).toUpperCase() + currentMethod.label.slice(1)}
                  </InputLabel>
                  <OutlinedInput
                    id="search-valuue"
                    type="text"
                    value={values.searchValue}
                    name="searchValue"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={`Enter ${currentMethod.label}`}
                    fullWidth
                    error={Boolean(touched.searchValue && errors.searchValue)}
                  />
                </Stack>
                {touched.searchValue && errors.searchValue && (
                  <FormHelperText error id="standard-weight-helper-text-title-book-send">
                    {errors.searchValue}
                  </FormHelperText>
                )}
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {isSubmitting ? 'Searching...' : 'SEARCH'}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
