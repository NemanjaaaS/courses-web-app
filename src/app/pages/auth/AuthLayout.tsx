import { Box, Grid, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Grid container direction="row" sx={{ minHeight: '100vh', display: 'flex' }}>
      <Grid
        sx={{
          display: { sm: 'none', lg: 'flex' },
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
          p: 6,
        }}
        size={{ sm: 0, md: 8 }}
      >
        <Box sx={{ maxWidth: 480, textAlign: 'center', color: 'white' }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Naučite nove veštine. Unapredite karijeru.
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
            Pristupite stotinama kurseva i testova. Dobijte sertifikate koji potvrđuju vaše znanje.
          </Typography>
          <Stack direction="row" spacing={6} justifyContent="center">
            <Box textAlign="center">
              <Typography variant="h3" fontWeight={700}>
                500+
              </Typography>
              <Typography sx={{ opacity: 0.8 }}>Kurseva</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h3" fontWeight={700}>
                10k+
              </Typography>
              <Typography sx={{ opacity: 0.8 }}>Korisnika</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h3" fontWeight={700}>
                95%
              </Typography>
              <Typography sx={{ opacity: 0.8 }}>Zadovoljstvo</Typography>
            </Box>
          </Stack>
        </Box>
      </Grid>
      <Grid size={{ md: 4, sm: 12 }}>{children}</Grid>
    </Grid>
  );
};
