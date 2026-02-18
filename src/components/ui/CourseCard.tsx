import { Box, Card, CardContent, Typography, Button, Chip, Stack, IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import type { Course } from '../../lib/types';
import { mapCategory } from '../../app/pages/admin/helpers/helperMethods';
import { useDeleteCourseMutation } from '../../app/api/api';
import { toast } from 'react-toastify';
import IconifyIcon from '../base/IconifyIcon';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../app/pages/auth/user/userSlice';

interface CourseCardProps {
  course: Course;
  onEnroll?: () => void;
  enrolled?: boolean;
}

const difficultyColors = {
  BEGINNER: 'success' as const,
  INTERMEDIATE: 'warning' as const,
  ADVANCED: 'error' as const,
};

const difficultyLabels = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
};

export function CourseCard({ course, onEnroll, enrolled }: CourseCardProps) {
  const [deleteCourse] = useDeleteCourseMutation();
  const isAdmin = useAppSelector(selectUser).role === 'ADMIN';
  const handleDeleteCouse = async (courseId: number) => {
    try {
      await deleteCourse(courseId).unwrap();
      toast.success('Course deleted successfully!');
    } catch {
      toast.error('Failed to delete course');
    }
  };
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Chip
            label={difficultyLabels[course.level]}
            color={difficultyColors[course.level]}
            size="small"
            sx={{ position: 'absolute', top: 12, right: 12 }}
          />
        </Box>
        <Typography variant="caption" color="primary" fontWeight="medium">
          {mapCategory(course.category)}
        </Typography>

        <Typography
          variant="h6"
          component="h3"
          sx={{
            mt: 0.5,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {course.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {course.shortDescription}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {course.durationHours}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon sx={{ fontSize: 20, color: 'warning.main' }} />
            <Typography variant="body2" color="text.secondary">
              {course.rating}
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold">
            {course.price.toLocaleString('sr-RS')}{' '}
            <Typography component="span" variant="body2" color="text.secondary">
              RSD
            </Typography>
          </Typography>
          {!isAdmin ? (
            <Button variant={enrolled ? 'outlined' : 'contained'} size="small" onClick={onEnroll}>
              {enrolled ? 'Enrolled' : 'Enroll Now'}
            </Button>
          ) : (
            <IconButton onClick={() => handleDeleteCouse(Number(course.id))}>
              <IconifyIcon icon={'mdi:bin-outline'} color="red" />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
