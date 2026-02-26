import { Box, Grid, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Grid container direction="row" sx={{ minHeight: '100vh', display: 'flex' }}>
      <Grid
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        }}
      >
        <Box sx={{ maxWidth: 580, textAlign: 'center', color: 'white' }}>
          <Box>
            <Typography variant="h1" fontWeight={700} gutterBottom fontStyle={'italic'}>
              SkillStack
            </Typography>
          </Box>
          <Box pt={4}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Build Skills That Shape Your Future.
            </Typography>

            <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
              Explore courses, challenge yourself with real-world tests, and earn certificates that validate your expertise.
            </Typography>
          </Box>

          <Stack direction="row" spacing={4} justifyContent="space-between" pt={5}>
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={700}>
                Master Skills.
              </Typography>
            </Box>

            <Box textAlign="center">
              <Typography variant="h4" fontWeight={700}>
                Prove Your Knowledge.
              </Typography>
            </Box>

            <Box textAlign="center">
              <Typography variant="h4" fontWeight={700}>
                Stand Out.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>{children}</Grid>
    </Grid>
  );
};
