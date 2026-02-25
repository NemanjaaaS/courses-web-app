import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardContent, Typography } from '@mui/material';
import type { MonthlyRevenueDTO } from '../../lib/types';

type Props = {
  revenueByMonth: MonthlyRevenueDTO[];
};

export default function RevenueLineChart({ revenueByMonth }: Props) {
  const sorted = [...revenueByMonth].sort((a, b) => a.month.localeCompare(b.month));

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
              data: sorted.map((m) => m.month),
              scaleType: 'point',
            },
          ]}
          series={[
            {
              label: 'Prihod (RSD)',
              data: sorted.map((m) => m.revenue),
              area: true,
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
