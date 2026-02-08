import { Box, Typography, Grid, Card, CardContent, Avatar, Chip } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

import { mockUserTests } from '../../../lib/mockData';
import { StatTrendCard } from '../../../components/widgets/StatTrendCardWidget';
import PeopleIcon from '@mui/icons-material/People';
import { ProgressCardWidget } from '../../../components/widgets/ProgressCardWidget';
import { useAppSelector } from '../../../store/hooks';
import { selectUser } from '../auth/user/userSlice';
export const UserDashboardPage = () => {
  const user = useAppSelector(selectUser);
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
            title="Total Users"
            value={6}
            percentage={15}
            period="from last month"
            data={[1, 2, 1, 15, 12, 5]}
            icon={<PeopleIcon color="primary" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <StatTrendCard
            title="Total Users"
            value={6}
            percentage={15}
            period="from last month"
            data={[1, 2, 1, 15, 12, 5]}
            icon={<PeopleIcon color="primary" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <StatTrendCard
            title="Total Users"
            value={6}
            percentage={15}
            period="from last month"
            data={[1, 2, 1, 15, 12, 5]}
            icon={<PeopleIcon color="primary" />}
          />
        </Grid>
      </Grid>

      {/* Progress Section */}
      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Progress Section
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <ProgressCardWidget title="Web Development Fundamentals" current={2} total={5} status="in-progress" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <ProgressCardWidget title="React & TypeScript Mastery" current={4} total={4} status="completed" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <ProgressCardWidget title="Python za Data Science" current={0} total={6} status="not-started" />
          </Grid>
        </Grid>
      </Box>

      {/* Recent Activity */}
      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Recent Activity
        </Typography>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            {mockUserTests.slice(0, 3).map((test) => (
              <Box
                key={test.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': { borderBottom: 'none', pb: 0 },
                  '&:first-of-type': { pt: 0 },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: test.passed ? 'success.light' : test.status === 'in-progress' ? 'warning.light' : 'error.light',
                      color: test.passed ? 'success.main' : test.status === 'in-progress' ? 'warning.main' : 'error.main',
                    }}
                  >
                    <DescriptionIcon />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="medium">{test.courseName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {test.status === 'completed' ? `Result: ${test.score}%` : 'In Progress'}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={test.passed ? 'Pass' : test.status === 'in-progress' ? 'In Progress' : 'Failed'}
                  color={test.passed ? 'success' : test.status === 'in-progress' ? 'warning' : 'error'}
                  size="small"
                />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
