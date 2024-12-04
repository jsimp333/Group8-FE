'use client';

import React from 'react';

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

import axios from 'utils/axios';

const noImageURL = 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'
const noSmallImageURL = 'https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png'

const initialValues = {
  title: '',
  author: '',
  date: '',  
  isbn: '',  
  image_url: '',
  image_small_url: '',
  submit: null
};

export default function SendBook({
  onSuccess,
  onError
}: {
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          title: Yup.string().min(3, 'TItle base be at least 3 characters').max(255).required('Title is required'),
          author: Yup.string().max(255).required('Author is required'),
          date: Yup.number().min(1000, 'Year must be greater than 1000')
            .max((new Date().getFullYear()), 'Year cannot be greater than the current year')
            .required('Publication year is required'),
          isbn: Yup.string().matches(/^\d{13}$/, 'ISBN must be 13 digits')
            .required('13 digit ISBN is required'),
          image_url: Yup.string().url().nullable(),
          image_small_url: Yup.string().url().nullable()
        })}
        onSubmit={(values, { setErrors, setSubmitting, setValues, resetForm }) => {
          console.dir(values);
          axios
            .post('/book', { title: values.title, author: values.author, date: values.date, isbn: values.isbn,
               image_url: values.image_url ? values.image_url : noImageURL, image_small_url: values.image_small_url ? values.image_small_url : noSmallImageURL})
            .then((response) => {
              setSubmitting(false);
              resetForm({ values: initialValues });
              onSuccess();
            })
            .catch((error) => {
              console.error(error);
              setErrors({ title: error.message });
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
                  <InputLabel htmlFor="title">Book's Title</InputLabel>
                  <OutlinedInput
                    id="book-title"
                    type="text"
                    value={values.title}
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the book's title"
                    fullWidth
                    error={Boolean(touched.title && errors.title)}
                  />
                </Stack>
                {touched.title && errors.title && (
                  <FormHelperText error id="standard-weight-helper-text-title-book-send">    
                    {errors.title}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="author">Author</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.author && errors.author)}
                    id="Author name"
                    type="text"
                    value={values.author}
                    name="author"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter author(s). Seperate with commas."
                  />
                </Stack>
                {touched.author && errors.author && (
                  <FormHelperText error id="standard-weight-helper-text-author-book-send">    
                    {errors.author}
                  </FormHelperText>
                )}
              </Grid>
              
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="date">Publication Date</InputLabel>
                  <OutlinedInput
                    id="publication-date"
                    type="text"
                    value={values.date}
                    name="date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the publication date"
                    fullWidth
                    error={Boolean(touched.date && errors.date)}
                  />
                </Stack>
                {touched.date && errors.date && (
                  <FormHelperText error id="standard-weight-helper-text-date-book-send">    
                    {errors.date}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="isbn">ISBN</InputLabel>
                  <OutlinedInput
                    id="ISBN"
                    type="number"
                    value={values.isbn}
                    name="isbn"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the ISBN"
                    fullWidth
                    error={Boolean(touched.isbn && errors.isbn)}
                  />
                </Stack>
                {touched.isbn && errors.isbn && (
                  <FormHelperText error id="standard-weight-helper-text-isbn-book-send">   
                    {errors.isbn}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="image_url">Image URL</InputLabel>
                  <OutlinedInput
                    id="image_url"
                    type="string"
                    value={values.image_url}
                    name="image_url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the image url"
                    fullWidth
                    error={Boolean(touched.image_url && errors.image_url)}
                  />
                </Stack>
                {touched.image_url && errors.image_url && (
                  <FormHelperText error id="standard-weight-helper-text-image-url-book-send">   
                    {errors.image_url}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="image_small_url">Small Image URL</InputLabel>
                  <OutlinedInput
                    id="image_small_url"
                    type="string"
                    value={values.image_small_url	}
                    name="image_small_url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the small image URL"
                    fullWidth
                    error={Boolean(touched.image_small_url && errors.image_small_url)}
                  />
                </Stack>
                {touched.image_small_url && errors.image_small_url && (
                  <FormHelperText error id="standard-weight-helper-text-image-url-small-book-send">   
                    {errors.image_small_url}
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
                    SEND!
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
