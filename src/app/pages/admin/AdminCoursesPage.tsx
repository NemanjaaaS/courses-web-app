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
import { useCreateCourseMutation, useGetCoursesQuery } from '../../api/api';
import { mapCategory } from './helpers/helperMethods';

export type NewCourse = {
  title: string;
  shortDescription: string;
  category: 'PROGRAMMING' | 'DATA_SCIENCE' | 'DESIGN' | 'DEVOPS' | 'SECURITY';
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  durationHours: number;
  price: number;
};

const categoryOptions = [
  { id: 1, label: 'Programming', value: 'PROGRAMMING' },
  { id: 2, label: 'Data Science', value: 'DATA_SCIENCE' },
  { id: 3, label: 'Design', value: 'DESIGN' },
  { id: 4, label: 'DevOps', value: 'DEVOPS' },
  { id: 5, label: 'Security', value: 'SECURITY' },
];

const levelOptions = [
  { id: 1, label: 'Begginer', value: 'BEGINNER' },
  { id: 2, label: 'Intermediate', value: 'INTERMEDIATE' },
  { id: 3, label: 'Advanced', value: 'Advanced' },
];

export const AdminCoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: courses = [], isLoading: coursesLoading } = useGetCoursesQuery();
  const [createCourse] = useCreateCourseMutation();
  const categories = [...new Set(courses.map((c) => c.category))];

  const filteredCourses = courses?.filter((course) => {
    const matchesSearch =
      course?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      course?.shortDescription?.toLowerCase().includes(searchQuery?.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || course.level === difficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setDifficultyFilter('all');
  };

  const handleCloseDialog = () => {
    reset();
    setIsDialogOpen(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewCourse>({
    defaultValues: {
      title: '',
      shortDescription: '',
      category: undefined,
      level: undefined,
      price: undefined,
      durationHours: undefined,
    },
  });

  const onSubmit = async (data: NewCourse) => {
    try {
      await createCourse(data).unwrap();
      handleCloseDialog();
      toast.success('Kurs je uspešno kreiran');
    } catch {
      toast.error('Faild to create course!');
    }
  };

  if (coursesLoading) {
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
          placeholder="Search courses..."
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
          <InputLabel>Category</InputLabel>
          <Select value={categoryFilter} label="Kategorija" onChange={(e) => setCategoryFilter(e.target.value)}>
            <MenuItem value="all">All categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {mapCategory(cat)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Difficulty</InputLabel>
          <Select value={difficultyFilter} label="Težina" onChange={(e) => setDifficultyFilter(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="BEGINNER">Beginner</MenuItem>
            <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
            <MenuItem value="ADVANCED">Advanced</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary">
        Found {filteredCourses.length} courses
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
        onClose={() => handleCloseDialog()}
        maxWidth="md"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 2, maxHeight: '90vh' } } }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <Typography variant="h5" fontWeight={600}>
              Create new course
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3}>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Title is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Course title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
              <Controller
                name="shortDescription"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Short description"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.shortDescription}
                    helperText={errors.shortDescription?.message}
                  />
                )}
              />
              <Grid container size={12} spacing={2}>
                <Grid size={6}>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select {...field} labelId="category-label" id="category-select">
                          {categoryOptions.map((cat) => (
                            <MenuItem key={cat.id} value={cat.value}>
                              {cat.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid size={6}>
                  <Controller
                    name="level"
                    control={control}
                    rules={{ required: 'Level is required' }}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="category-label">Level</InputLabel>
                        <Select {...field} label="Level" fullWidth>
                          {levelOptions.map((level) => (
                            <MenuItem key={level.id} value={level.value}>
                              {level.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container size={12} spacing={2}>
                <Grid size={6}>
                  <Controller
                    name="price"
                    control={control}
                    rules={{ required: 'Price is required', min: { value: 0, message: 'Price must be positive number' } }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Price"
                        type="number"
                        fullWidth
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />
                </Grid>
                <Grid size={6}>
                  <Controller
                    name="durationHours"
                    control={control}
                    rules={{ required: 'Time is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Course duration"
                        type="number"
                        fullWidth
                        rows={3}
                        error={!!errors.durationHours}
                        helperText={errors.durationHours?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => handleCloseDialog()}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Stack>
  );
};
