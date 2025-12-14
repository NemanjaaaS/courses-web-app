import { StatTrendCard } from '../../../components/widgets/StatTrendCardWidget';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Grid } from '@mui/material';
import MonthlyUsersChart from '../../../components/widgets/MonthlyUsersWidget';
import TestPassRateChart from '../../../components/widgets/TestsPassRateWidget';
import TopCoursesChart from '../../../components/widgets/TopCoursesWidget';
import RevenueLineChart from '../../../components/widgets/RevenueLineChart';
import { SimpleNumberWidget } from '../../../components/widgets/SimpleNumberWidget';
import { Assignment, EmojiEvents, TrendingUp } from '@mui/icons-material';
export const AdminDashboardRoute = () => {
  return (
    <Box sx={{ height: '100vh', overflowY: 'auto', p: 2, pb: 10 }}>
      <Grid container direction={'column'} spacing={2} width={'100%'} size="grow">
        <Grid container direction={'row'}>
          <Grid size="grow">
            <StatTrendCard
              title="Total Users"
              value={6}
              percentage={15}
              period="from last month"
              data={[1, 2, 1, 15, 12, 5]}
              icon={<PeopleIcon color="primary" />}
            />
          </Grid>
          <Grid size="grow">
            <StatTrendCard
              title="Active Users"
              value={30}
              percentage={15}
              period="from last month"
              data={[1, 2, 3, 15, 20, 30]}
              icon={<PeopleIcon color="primary" />}
            />
          </Grid>
          <Grid size="grow">
            <StatTrendCard
              title="Total Courses"
              value={6}
              percentage={15}
              period="from last month"
              data={[1, 2, 3, 4, 5, 6]}
              icon={<Assignment color="primary" />}
            />
          </Grid>
        </Grid>
        <Grid container direction={'row'} size={12}>
          <Grid size="grow">
            <MonthlyUsersChart />
          </Grid>
          <Grid size="grow">
            <TestPassRateChart />
          </Grid>
        </Grid>
        <Grid container size={12} direction={'row'}>
          <Grid size="grow">
            <TopCoursesChart />
          </Grid>
          <Grid size="grow">
            <RevenueLineChart />
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={'grow'}>
            <SimpleNumberWidget value={121} label="Tests passed this week" icon={<Assignment sx={{ color: '#4338ca' }} />} />
          </Grid>
          <Grid size={'grow'}>
            <SimpleNumberWidget value={4.7} label="Average Rate of the courses" icon={<TrendingUp sx={{ color: '#f59e0b' }} />} />
          </Grid>
          <Grid size={'grow'}>
            <SimpleNumberWidget
              value={14}
              label="Sertificats provided this month"
              icon={<EmojiEvents sx={{ color: '#10b981' }} />}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
