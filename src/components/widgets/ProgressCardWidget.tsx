import { Box, Card, CardContent, Typography, LinearProgress, Chip } from '@mui/material';

interface ProgressCardProps {
  title: string;
  current: number;
  total: number;
  status?: 'in-progress' | 'completed' | 'not-started';
}

const statusConfig = {
  'in-progress': { label: 'In Progress', color: 'warning' as const },
  completed: { label: 'Finished', color: 'success' as const },
  'not-started': { label: 'Not Started', color: 'default' as const },
};

export const ProgressCardWidget = ({ title, current, total, status = 'not-started' }: ProgressCardProps) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const config = statusConfig[status];

  return (
    <Card sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="medium">
            {title}
          </Typography>
          <Chip label={config.label} color={config.color} size="small" />
        </Box>

        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              {current} od {total} položeno
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {percentage}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={percentage} sx={{ height: 8, borderRadius: 1 }} />
        </Box>
      </CardContent>
    </Card>
  );
};
