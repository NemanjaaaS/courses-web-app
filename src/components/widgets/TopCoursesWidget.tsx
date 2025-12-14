import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Typography } from '@mui/material';
import { topCourses } from '../../lib/mockData';

export default function TopCoursesChart() {
  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Top 5 najpopularnijih kurseva
        </Typography>

        <BarChart
          height={300}
          xAxis={[
            {
              data: topCourses.map((c) => c.name),
              scaleType: 'band',
              categoryGapRatio: 0.5,
              barGapRatio: 0.1,
            },
          ]}
          series={[
            {
              label: 'Upisa',
              data: topCourses.map((c) => c.enrollments),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
