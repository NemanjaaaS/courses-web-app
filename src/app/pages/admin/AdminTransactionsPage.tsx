import { Box, Paper, Typography, Skeleton, Stack } from '@mui/material';
import { TrendingUp as TrendingUpIcon, AccessTime as ClockIcon, CreditCard as CreditCardIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { getTransactionsColumns } from '../../helpers/AdminTransactions.helper';
import { useGetRequestsQuery } from '../../api/api';

export const AdminTransactionsPage = () => {
  const { data: transactions, isLoading } = useGetRequestsQuery();

  const totalRevenue = transactions?.reduce((acc, t) => (t.status === 'APPROVED' ? acc + t.price : acc), 0);
  const pendingRevenue = transactions?.reduce((acc, t) => (t.status === 'PENDING' ? acc + t.price : acc), 0);
  const completedCount = transactions?.filter((t) => t.status === 'APPROVED').length;

  const columns = getTransactionsColumns();

  if (isLoading) {
    return <Skeleton variant="rounded" height={600} />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2 }}>
      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#10b98115' }}>
              <TrendingUpIcon sx={{ color: '#10b981' }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {totalRevenue?.toLocaleString('sr-RS')}{' '}
                <Typography component="span" variant="body2" color="text.secondary">
                  RSD
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total revenue
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f59e0b15' }}>
              <ClockIcon sx={{ color: '#f59e0b' }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {pendingRevenue?.toLocaleString('sr-RS')}{' '}
                <Typography component="span" variant="body2" color="text.secondary">
                  RSD
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#4338ca15' }}>
              <CreditCardIcon sx={{ color: '#4338ca' }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {completedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Finished transactions
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>

      {/* Data Grid */}
      <Paper sx={{ height: 'calc(100vh - 216px)', borderRadius: 3 }}>
        <DataGrid
          rows={transactions}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
          sx={{
            borderRadius: 3,
            border: 0,
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid',
              borderColor: 'divider',
            },
          }}
        />
      </Paper>
    </Box>
  );
};
