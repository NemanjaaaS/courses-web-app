import { useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid, Tabs, Tab, Paper } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { toast } from 'react-toastify';
import { mockCertificates } from '../../../lib/types';
import { DataGrid } from '@mui/x-data-grid';
import { getRequestsColumns } from '../../helpers/AdminRequests.helper';

export const AdminRequestsPage = () => {
  const [certificates, setCertificates] = useState(mockCertificates);
  const [tabValue, setTabValue] = useState(0);

  const approveCertificate = (id: number) => {
    setCertificates(
      certificates.map((cert) => {
        if (Number(cert.id) === id) {
          toast.success('Sertifikat je odobren');
          return { ...cert, status: 'approved' as const, approvedAt: new Date().toISOString() };
        }
        return cert;
      })
    );
  };

  const pendingCertificates = certificates.filter((c) => c.status === 'pending');
  const approvedCertificates = certificates.filter((c) => c.status === 'approved');
  const columns = getRequestsColumns(approveCertificate);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      {/* Stats */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.main' }}>
                <AccessTimeIcon />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {pendingCertificates.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Čeka odobrenje
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'success.light', color: 'success.main' }}>
                <CheckCircleIcon />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {approvedCertificates.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Odobreno
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                <EmojiEventsIcon />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {certificates.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ukupno zahteva
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs and Table */}
      <Paper sx={{ p: 1, borderRadius: 3, height: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label={`Na čekanju (${pendingCertificates.length})`} sx={{ textTransform: 'none' }} />
          <Tab label={`Odobreno (${approvedCertificates.length})`} sx={{ textTransform: 'none' }} />
        </Tabs>

        <Box sx={{ height: 'calc(100vh - 275px)', borderRadius: 3 }}>
          <DataGrid
            rows={tabValue === 0 ? pendingCertificates : approvedCertificates}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            disableRowSelectionOnClick
            sx={{
              border: 'none',
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};
