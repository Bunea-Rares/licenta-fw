import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import get from '../../api/get';
import post from '../../api/post';
import dayjs from 'dayjs';

interface Category {
  id: number;
  name: string;
}

export const CreatePost = () => {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [category, setCategory] = useState<string>('');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const getCategories = async () => {
      const response = await get('/category/GetAllCategories');
      const categories = await response.json();
      setCategories(categories);
      setCategory(categories.length > 0 ? categories[0].name : '');
    };
    getCategories();
  }, []);

  const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.target[0].value;
    const categoryID = parseInt(e.target[1].value);
    const date = e.target[3].value;
    const duration = e.target[6].value;
    const storyPoints = parseInt(e.target[7].value);
    const description = e.target[8].value;
    const parsedDate = dayjs(date, { format: 'MM/DD/YYYY hh:mm A' });
    const startsOn = parsedDate.format('YYYY-MM-DDTHH:mm:ss[Z]');
    const endsOn = parsedDate.add(parseInt(duration), 'hours').format('YYYY-MM-DDTHH:mm:ss[Z]');
    
    try {
      const response = await post('/CreateEvent', {
        title,
        description,
        storyPoints,
        categoryID,
        startsOn,
        endsOn,
      });

      if(response.ok) {
        setSnackbarSeverity('success');
        setSnackbarMessage('Event created successfully!');
        setSnackbarOpen(true);
        resetFormValues();
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to create event.');
      setSnackbarOpen(true);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => setCategory(event.target.value as string);

  const resetFormValues = () => {
    // Reset form values here
    setCategory(categories.length > 0 ? categories[0].name : '');
  };

  const handleSnackbarClose = (event: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <form onSubmit={handleEventSubmit}>
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          Create Post
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input id="title" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="category">Category</InputLabel>
          <Select id="category" value={category} onChange={handleSelectChange}>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="date"></InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker id="date" />
          </LocalizationProvider>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="duration">Duration (h)</InputLabel>
          <Input id="duration" type="number" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="points">Points</InputLabel>
          <Input id="points" type="number" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextareaAutosize id="description" minRows={4} placeholder="Description" style={{ width: '100%' }} />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </form>
  );
};