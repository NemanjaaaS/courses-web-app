import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface StatTrendCardProps {
  title: string;
  value: number | string;
  percentage?: number;
  data: number[];
  period?: string;
  icon?: React.ReactNode;
}

export const StatTrendCard: React.FC<StatTrendCardProps> = ({ title, value, percentage, data, period = 'Last month', icon }) => {
  const isPositive = (percentage ?? 0) >= 0;

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
        minWidth: 400,
      }}
    >
      {/* LEFT SIDE */}
      <Stack spacing={0.5}>
        <Stack direction="row" spacing={1} alignItems="center">
          {icon}
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Stack>

        <Typography variant="h4" fontWeight={600}>
          {value}
        </Typography>

        {percentage !== undefined && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            {isPositive ? (
              <TrendingUpIcon fontSize="small" color="success" />
            ) : (
              <TrendingDownIcon fontSize="small" color="error" />
            )}
            <Typography variant="caption" color={isPositive ? 'success.main' : 'error.main'}>
              {Math.abs(percentage)}% {period}
            </Typography>
          </Stack>
        )}
      </Stack>

      {/* RIGHT SIDE */}
      <SparkLineChart
        data={data}
        height={100}
        width={200}
        area
        showHighlight
        curve="natural"
        sx={{
          [`& .MuiAreaElement-root`]: { opacity: 0.2 },
          [`& .MuiLineElement-root`]: { strokeWidth: 2 },
        }}
      />
    </Box>
  );
};
