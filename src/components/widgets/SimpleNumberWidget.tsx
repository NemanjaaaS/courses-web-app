import { Box, Paper, Stack, Typography } from '@mui/material';

export const SimpleNumberWidget = ({ value, label, icon }: { value: number; label: string; icon: React.ReactNode }) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#4338ca15' }}>{icon}</Box>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};
