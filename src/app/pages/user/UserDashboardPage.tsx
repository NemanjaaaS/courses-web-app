import { Box, Typography, Grid, Card, CardContent, Divider, CircularProgress } from '@mui/material';
import { StatTrendCard } from '../../../components/widgets/StatTrendCardWidget';
import PeopleIcon from '@mui/icons-material/People';
import { ProgressCardWidget } from '../../../components/widgets/ProgressCardWidget';
import { useAppSelector } from '../../../store/hooks';
import { selectUser } from '../auth/user/userSlice';
import { useGetUserDashboardQuery } from '../../api/api';
import TestPassRateChart from '../../../components/widgets/TestsPassRateWidget';

export const UserDashboardPage = () => {
  const user = useAppSelector(selectUser);
  const { data, isLoading } = useGetUserDashboardQuery();

  if (isLoading || !data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }
  const totalTests = (data?.passedTests ?? 0) + (data?.failedTests ?? 0);
  const testPassRate = totalTests > 0 ? ((data.passedTests ?? 0) / totalTests) * 100 : 0;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, overflowY: 'auto', height: 'calc(100vh - 66px)' }}>
      {/* Welcome Header */}
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {`Welcome back, ${user.firstName}! 👋`}
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <StatTrendCard
            title="My Courses"
            value={data?.totalEnrollments ?? 0}
            percentage={0}
            period=""
            data={[]}
            icon={<PeopleIcon color="primary" />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <StatTrendCard
            title="Completed Courses"
            value={data?.completedCourses ?? 0}
            percentage={0}
            period=""
            data={[]}
            icon={<PeopleIcon color="success" />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <StatTrendCard
            title="Average Test Score"
            value={data?.averageScore?.toFixed(0) ?? 0}
            percentage={0}
            period=""
            data={[]}
            icon={<PeopleIcon color="warning" />}
          />
        </Grid>
        <Grid container size={12}>
          <Grid size={6}>
            <TestPassRateChart
              passedTests={data.passedTests}
              failedTests={data.failedTests}
              testPassRate={testPassRate?.toFixed(1)}
            />
          </Grid>
          {data?.courseProgress && data.courseProgress.length > 0 && (
            <Grid size={6}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Progress Section
              </Typography>
              <Grid container spacing={2}>
                {data?.courseProgress?.map((course) => (
                  <Grid key={course.courseId} size={12}>
                    <ProgressCardWidget
                      title={course.courseName}
                      current={course.completedTests}
                      total={course.totalTests}
                      status={course.status}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Recent Activity
        </Typography>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            {data?.recentTests?.slice(0, 5).map((test) => (
              <Box key={test.testId} sx={{ mb: 2 }}>
                <Typography fontWeight={500}>{test.courseName}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {`Score: ${test.score}%`}
                </Typography>
                <Divider />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
