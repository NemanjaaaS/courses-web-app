import { Box, Grid, CircularProgress } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { Assignment, TrendingUp } from '@mui/icons-material';

import { StatTrendCard } from '../../../components/widgets/StatTrendCardWidget';
import { SimpleNumberWidget } from '../../../components/widgets/SimpleNumberWidget';
import RevenueLineChart from '../../../components/widgets/RevenueLineChart';
import { useGetAdminDashboardQuery } from '../../api/api';
import TestPassRateChart from '../../../components/widgets/TestsPassRateWidget';
import AverageTestScoreListWidget from '../../../components/widgets/AverageTestScore';
import TopCoursesChart from '../../../components/widgets/TopCoursesWidget';

export const AdminDashboardRoute = () => {
  const { data, isLoading } = useGetAdminDashboardQuery();

  if (isLoading || !data) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ height: '100vh', overflowY: 'auto', p: 2, pb: 10 }}>
      <Grid container direction="column" spacing={3}>
        {/* TOP CARDS */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatTrendCard
              title="Total Users"
              value={data.totalUsers}
              percentage={0}
              period="live data"
              data={data.cumulativeUserCount}
              icon={<PeopleIcon color="primary" />}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <StatTrendCard
              title="Active Users"
              value={data.activeUsers}
              percentage={0}
              period="live data"
              data={[]}
              icon={<PeopleIcon color="primary" />}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <StatTrendCard
              title="Total Courses"
              value={data.totalCourses}
              percentage={0}
              period="live data"
              data={[]}
              icon={<Assignment color="primary" />}
            />
          </Grid>
        </Grid>

        {/* REVENUE CHART */}
        <Grid container spacing={2}>
          <Grid size={6}>
            <RevenueLineChart revenueByMonth={data.revenueByMonth} />
          </Grid>
          <Grid size={6}>
            <TestPassRateChart
              passedTests={data.passedTests}
              failedTests={data.failedTests}
              testPassRate={data.passRate.toFixed(2)}
            />
          </Grid>
          {/* BOTTOM STATS */}
          <Grid container spacing={2} size={12}>
            <Grid size={{ xs: 12, md: 4 }}>
              <SimpleNumberWidget
                value={data.totalRevenue}
                label="Total Revenue (RSD)"
                icon={<TrendingUp sx={{ color: '#22c55e' }} />}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <SimpleNumberWidget
                value={data.pendingRevenue}
                label="Pending Revenue (RSD)"
                icon={<TrendingUp sx={{ color: '#f59e0b' }} />}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <SimpleNumberWidget
                value={data.conversionRate}
                label="Conversion Rate (%)"
                icon={<TrendingUp sx={{ color: '#6366f1' }} />}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} size={12}>
            <Grid size={6}>
              <AverageTestScoreListWidget data={data.averageTestScoreList} />
            </Grid>
            <Grid size={6}>
              <TopCoursesChart topCourses={data.topCourseDTOS} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
