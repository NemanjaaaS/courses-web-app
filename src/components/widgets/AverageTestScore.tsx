import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Typography } from '@mui/material';
import type { TestList } from '../../lib/types';

type Props = {
  data: { tests: TestList; averageScore: number }[]; // better: define proper type
};

export default function AverageTestScoreListWidget({ data }: Props) {
  const chartData = data.map((item) => ({
    name: item.tests.title,
    score: item.averageScore,
  }));

  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Average score for tests
        </Typography>

        <BarChart
          height={300}
          xAxis={[
            {
              data: chartData.map((c) => c.name),
              scaleType: 'band',
              categoryGapRatio: 0.5,
              barGapRatio: 0.1,
            },
          ]}
          series={[
            {
              label: 'Average Score (%)',
              data: chartData.map((c) => c.score),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
