import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent, Typography } from '@mui/material';

export default function TestPassRateChart({
  passedTests,
  failedTests,
  testPassRate,
}: {
  passedTests: number;
  failedTests: number;
  testPassRate: string;
}) {
  const testPassRates = [
    { name: 'Passed', value: passedTests, color: 'hsl(var(--success))' },
    { name: 'Failed', value: failedTests, color: 'hsl(var(--destructive))' },
  ];
  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Passing test rate
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
        <Typography>Test pass rate: {testPassRate}%</Typography>
      </CardContent>
    </Card>
  );
}
