import { useState } from 'react';

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Stack,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { CourseCard } from '../../../components/ui/CourseCard';
import { useForm, Controller } from 'react-hook-form';
import { useGetCoursesQuery } from '../../api/api';

type NewCourse = {
  title: string;
  description: string;
  price: number;
};

export const AdminCoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: courses = [], isLoading: coursesLoading } = useGetCoursesQuery();
  const categories = [...new Set(courses.map((c) => c.category))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || course.difficulty === difficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setDifficultyFilter('all');
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewCourse>({
    defaultValues: {
      title: '',
      description: '',
      price: undefined,
    },
  });

  const onSubmit = (data: NewCourse) => {
    console.log(data);
    toast.success('Kurs je uspešno kreiran');
  };

  const isLoading = coursesLoading;

  if (isLoading) {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, p: 2 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} variant="rounded" animation={'wave'} height={180} />
        ))}
      </Box>
    );
  }

  return (
    <Stack sx={{ p: 2, height: '100vh', pt: 0 }} spacing={2}>
      <Fab
        variant="extended"
        color="primary"
        onClick={() => setIsDialogOpen(true)}
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
      {/* Filters */}
      <Stack direction={'row'} spacing={2}>
        <TextField
          placeholder="Pretražite kurseve..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Kategorija</InputLabel>
          <Select value={categoryFilter} label="Kategorija" onChange={(e) => setCategoryFilter(e.target.value)}>
            <MenuItem value="all">Sve kategorije</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Težina</InputLabel>
          <Select value={difficultyFilter} label="Težina" onChange={(e) => setDifficultyFilter(e.target.value)}>
            <MenuItem value="all">Sve težine</MenuItem>
            <MenuItem value="beginner">Početnik</MenuItem>
            <MenuItem value="intermediate">Srednji</MenuItem>
            <MenuItem value="advanced">Napredni</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary">
        Pronađeno {filteredCourses.length} kurseva
      </Typography>

      {/* Scrollable courses section */}
      <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 170px)' }}>
        <Grid container spacing={2} py={2}>
          {filteredCourses.map((course) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={course.id}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>

        {filteredCourses.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Nema kurseva koji odgovaraju vašoj pretrazi
            </Typography>
            <Button variant="outlined" onClick={resetFilters} sx={{ mt: 2 }}>
              Resetuj filtere
            </Button>
          </Box>
        )}
      </Box>

      {/* Create Course Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="md"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 2, maxHeight: '90vh' } } }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <Typography variant="h5" fontWeight={600}>
              Kreiraj novi kurs
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3}>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Naziv je obavezan' }}
                render={({ field }) => (
                  <TextField {...field} label="Naziv kursa" fullWidth error={!!errors.title} helperText={errors.title?.message} />
                )}
              />
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Opis je obavezan' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Kratak opis"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                rules={{ required: 'Cena je obavezna', min: { value: 0, message: 'Cena mora biti pozitivna' } }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Cena"
                    type="number"
                    fullWidth
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setIsDialogOpen(false)}>Otkaži</Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Kreiraj kurs
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Stack>
  );
};
