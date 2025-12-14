import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardContent, Typography } from '@mui/material';
import { monthlyStats } from '../../lib/mockData';

export default function RevenueLineChart() {
  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Mesečni prihod (RSD)
        </Typography>

        <LineChart
          height={350}
          xAxis={[
            {
              data: monthlyStats.map((m) => m.month),
              scaleType: 'point',
            },
          ]}
          series={[
            {
              label: 'Prihod (RSD)',
              data: monthlyStats.map((m) => m.revenue),
              area: true,
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
