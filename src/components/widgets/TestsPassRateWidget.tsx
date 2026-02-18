import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent, Typography } from '@mui/material';
import { testPassRates } from '../../lib/types';

export default function TestPassRateChart() {
  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Prolaznost testova
        </Typography>

        <PieChart
          height={300}
          series={[
            {
              innerRadius: 70,
              outerRadius: 120,
              data: testPassRates.map((item, index) => ({
                id: index,
                value: item.value,
                label: item.name,
              })),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
