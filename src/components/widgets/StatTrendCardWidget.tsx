import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

interface StatTrendCardProps {
  title: string;
  value: number | string;
  percentage?: number;
  data: { cumulativeTotal: number; createdAt: string }[];
  period?: string;
  icon?: React.ReactNode;
}

export const StatTrendCard: React.FC<StatTrendCardProps> = ({ title, value, data, icon }) => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: 'background.paper',
        boxShadow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 200,
      }}
    >
      {/* LEFT SIDE */}
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          {icon}
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Stack>

        <Typography variant="h4" fontWeight={600}>
          {value}
        </Typography>
      </Stack>

      {/* RIGHT SIDE */}
      <SparkLineChart
        plotType="bar"
        data={data.map((item) => item.cumulativeTotal)}
        height={100}
        width={200}
        area
        showTooltip
        showHighlight
        curve="natural"
        xAxis={{
          scaleType: 'band',
          data: data.map((item) => item.createdAt),
        }}
        sx={{
          [`& .MuiAreaElement-root`]: { opacity: 0.2 },
          [`& .MuiLineElement-root`]: { strokeWidth: 2 },
        }}
      />
    </Box>
  );
};
