import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardContent, Typography } from '@mui/material';
import { monthlyStats } from '../../lib/types';

export default function MonthlyUsersChart() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Mesečna statistika
        </Typography>

        <LineChart
          height={300}
          xAxis={[
            {
              data: monthlyStats.map((m) => m.month),
              scaleType: 'point',
            },
          ]}
          series={[
            {
              label: 'New Users',
              data: monthlyStats.map((m) => m.users),
            },
            {
              label: 'Assignees',
              data: monthlyStats.map((m) => m.enrollments),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
