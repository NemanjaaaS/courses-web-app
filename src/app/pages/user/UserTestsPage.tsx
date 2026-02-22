import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Grid,
  LinearProgress,
  Avatar,
  Skeleton,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useGetUserTestsQuery } from '../../api/api';
import IconifyIcon from '../../../components/base/IconifyIcon';

export const UserTestsPage = () => {
  const navigate = useNavigate();

  const { data: tests = [], isLoading } = useGetUserTestsQuery();
  const handleStartTest = (testId: number) => {
    navigate(`/app/user/my-tests/${testId}`);
  };

  const passedTests = tests.filter((test) => test.passed);

  const progressPercentage = tests.length > 0 ? (passedTests.length / tests.length) * 100 : 0;

  if (isLoading) {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, p: 2 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} variant="rounded" animation="wave" height={180} />
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 65px)' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        {/* Progress Overview */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="medium">
                Your Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {passedTests.length} of {tests.length} passed
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={progressPercentage} sx={{ height: 12, borderRadius: 1 }} />
          </CardContent>
        </Card>

        {/* Tests Grid */}

        <Grid container spacing={2}>
          {tests.map((test) => {
            const isPassed = test.attended && test.passed;
            const isFailed = test.attended && !test.passed;

            const getButtonText = () => {
              if (isPassed) return 'Retake Test';
              if (isFailed) return 'Try Again';
              return 'Start Test';
            };

            const getButtonVariant = () => {
              if (isPassed) return 'outlined';
              if (isFailed) return 'outlined';
              return 'contained';
            };

            const getButtonIcon = () => {
              if (isPassed) return <CheckCircleIcon />;
              return <PlayArrowIcon />;
            };

            return (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={test.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: isPassed ? 'success.light' : isFailed ? 'error.light' : 'primary.light',
                          color: isPassed ? 'success.main' : isFailed ? 'error.main' : 'primary.main',
                        }}
                      >
                        {isPassed ? <CheckCircleIcon /> : isFailed ? <IconifyIcon icon={'mdi:cancel'} /> : <DescriptionIcon />}
                      </Avatar>

                      <Chip
                        label={`${test.numberOfQuestions} questions`}
                        size="small"
                        color={isPassed ? 'success' : isFailed ? 'error' : 'default'}
                      />
                    </Box>

                    <Typography variant="h6" gutterBottom>
                      {test.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {test.course.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {test.durationMinutes} min
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CheckCircleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {test.passingScorePercentage}% to pass
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button
                      fullWidth
                      variant={getButtonVariant()}
                      color={isFailed ? 'primary' : isPassed ? 'success' : 'primary'}
                      startIcon={getButtonIcon()}
                      onClick={() => handleStartTest(test.id)}
                    >
                      {getButtonText()}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};
