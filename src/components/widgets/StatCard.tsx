/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Paper, Typography } from '@mui/material';

export const StatCard = ({ title, value }: { title: string; value: any }) => (
  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
    </Paper>
  </Grid>
);
