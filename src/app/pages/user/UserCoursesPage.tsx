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
  Skeleton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import { CourseCard } from '../../../components/ui/CourseCard';
import { useGetCoursesQuery, useRequestEnrollCourseMutation } from '../../api/api';
import { mapCategory } from '../admin/helpers/helperMethods';

export const UserCoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const { data: courses = [], isLoading: coursesLoading } = useGetCoursesQuery();
  const [enrollCourse] = useRequestEnrollCourseMutation();
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

  const handleEnrollCourse = async (courseId: number) => {
    try {
      await enrollCourse(courseId);
      toast.success('Request is sent successfully!');
    } catch {
      toast.error('Failed to enroll on course');
    }
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
      {/* Filters */}
      <Stack direction={'row'} spacing={2} pt={1}>
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
              <CourseCard course={course} onEnroll={() => handleEnrollCourse(course.id)} />
            </Grid>
          ))}
        </Grid>

        {filteredCourses.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Curses that are matching your filters
            </Typography>
            <Button variant="outlined" onClick={resetFilters} sx={{ mt: 2 }}>
              Reset filters
            </Button>
          </Box>
        )}
      </Box>
    </Stack>
  );
};
