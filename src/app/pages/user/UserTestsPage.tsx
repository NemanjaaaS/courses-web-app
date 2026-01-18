import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardActions, Button, Chip, Grid, LinearProgress, Avatar } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { mockCourses, mockTests } from '../../../lib/mockData';

export const UserTestsPage = () => {
  const navigate = useNavigate();
  const [completedTests] = useState<string[]>(['1']);

  const getCourseTitle = (courseId: string) => {
    return mockCourses.find((c) => c.id === courseId)?.title || 'Nepoznat kurs';
  };

  const startTest = (testId: string) => {
    navigate(`/app/user/my-tests/${testId}`);
  };

  const progressPercentage = (completedTests.length / mockTests.length) * 100;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      {/* Progress Overview */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="medium">
              Vaš napredak
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {completedTests.length} od {mockTests.length} položeno
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={progressPercentage} sx={{ height: 12, borderRadius: 1 }} />
        </CardContent>
      </Card>

      {/* Tests Grid */}
      <Grid container spacing={2}>
        {mockTests.map((test) => {
          const isCompleted = completedTests.includes(test.id);
          return (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={test.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: isCompleted ? 'success.light' : 'primary.light',
                        color: isCompleted ? 'success.main' : 'primary.main',
                      }}
                    >
                      {isCompleted ? <CheckCircleIcon /> : <DescriptionIcon />}
                    </Avatar>
                    <Chip label={`${test.questions.length} pitanja`} size="small" color={isCompleted ? 'success' : 'default'} />
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    {test.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {getCourseTitle(test.courseId)}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {test.duration} min
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CheckCircleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {test.passingScore}% za prolaz
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    fullWidth
                    variant={isCompleted ? 'outlined' : 'contained'}
                    startIcon={isCompleted ? <CheckCircleIcon /> : <PlayArrowIcon />}
                    onClick={() => startTest(test.id)}
                  >
                    {isCompleted ? 'Ponovi test' : 'Započni test'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
