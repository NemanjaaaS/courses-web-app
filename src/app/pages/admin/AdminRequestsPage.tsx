import { useState } from 'react';
import { getRequestsColumns } from '../../helpers/AdminRequests.helper';
import { useChangeRequestStatusMutation, useGetRequestsQuery } from '../../api/api';
import { toast } from 'react-toastify';
import { Box, Typography, Card, CardContent, Avatar, Grid, Tabs, Tab, Paper } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { DataGrid } from '@mui/x-data-grid';
export const AdminRequestsPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const { data: requests, isLoading: isLoadingRequests } = useGetRequestsQuery();
  const [changeRequestStatus] = useChangeRequestStatusMutation();
  console.log(requests);

  const changeStatus = async (requestId: number, status: 'PENDING' | 'APPROVED' | 'REJECTED') => {
    try {
      await changeRequestStatus({ requestId: requestId, requestStatus: status }).unwrap();
      toast.success('Status changed successfully');
    } catch {
      toast.error('Failed to change status');
    }
  };

  const pendingRequests = requests?.filter((c) => c.status === 'PENDING') ?? [];
  const approvedRequests = requests?.filter((c) => c.status === 'APPROVED') ?? [];
  const columns = getRequestsColumns(changeStatus);
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
                  {pendingRequests.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Waiting for approval
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
                  {approvedRequests.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Approved
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
                  {requests?.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total requests
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
          <Tab label={`Pending (${pendingRequests.length})`} sx={{ textTransform: 'none' }} />
          <Tab label={`Approved (${approvedRequests.length})`} sx={{ textTransform: 'none' }} />
        </Tabs>

        <Box sx={{ height: 'calc(100vh - 275px)', borderRadius: 3 }}>
          <DataGrid
            rows={tabValue === 0 ? pendingRequests : approvedRequests}
            columns={columns}
            loading={isLoadingRequests}
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
