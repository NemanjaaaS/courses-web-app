import { Box, Paper, Typography, Skeleton, Stack } from '@mui/material';
import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from '@mui/icons-material';
import { useGetUserTestsQuery } from '../../api/api';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from '../../helpers/AdminResults.helper';

export const AdminResultsPage = () => {
  const { data: userTests = [], isLoading } = useGetUserTestsQuery();

  const passedCount = userTests.filter((r) => r.passed).length;
  const failedCount = userTests.filter((r) => !r.passed && r.status === 'completed').length;
  const passRate = passedCount + failedCount > 0 ? ((passedCount / (passedCount + failedCount)) * 100).toFixed(1) : '0';

  if (isLoading) {
    return (
      <Box>
        <Skeleton variant="rounded" height={600} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#10b98115' }}>
              <TrendingUpIcon sx={{ color: '#10b981' }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {passedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Položeno
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#ef444415' }}>
              <TrendingDownIcon sx={{ color: '#ef4444' }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {failedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nije položeno
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#4338ca15' }}>
              <TrendingUpIcon sx={{ color: '#4338ca' }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {passRate}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Prolaznost
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>

      {/* Data Grid */}
      <Paper sx={{ height: 'calc(100vh - 216px)', borderRadius: 3 }}>
        <DataGrid
          showToolbar
          rows={userTests}
          columns={columns}
          loading={isLoading}
          disableRowSelectionOnClick
          sx={{ height: '100%', p: 1, borderRadius: 3 }}
        />
      </Paper>
    </Box>
  );
};
