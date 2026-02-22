import { Box, Avatar, Typography, Chip, Stack, IconButton, Tooltip } from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconifyIcon from '../../components/base/IconifyIcon';

export const getRequestsColumns = (
  handleAcceptRequest: (requestId: number, status: 'PENDING' | 'APPROVED' | 'REJECTED') => void
) => {
  const columns: GridColDef[] = [
    {
      field: 'userName',
      headerName: 'User',
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
          <Avatar sx={{ bgcolor: 'primary.light', width: 28, height: 28, fontSize: 14 }}>{params.value?.charAt(0)}</Avatar>

          <Typography fontWeight="medium">{params.row.userName}</Typography>
        </Box>
      ),
    },
    {
      field: 'courseName',
      headerName: 'Course',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
      valueFormatter: (value: number) => `${value} RSD`,
    },
    {
      field: 'requestDate',
      headerName: 'Request Date',
      width: 160,
      valueFormatter: (value: string) => new Date(value).toLocaleDateString('sr-RS'),
    },
    {
      field: 'processedDate',
      headerName: 'Processed Date',
      width: 160,
      valueFormatter: (value: string) => new Date(value).toLocaleDateString('sr-RS'),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value === 'APPROVED' ? 'Approved' : 'Pending'}
          color={params.value === 'APPROVED' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 130,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={'row'} spacing={1} sx={{ alignItems: 'center', height: '100%' }}>
          <Tooltip title="Approve" arrow>
            <Box>
              <IconButton
                onClick={() => handleAcceptRequest(params.row.id, 'APPROVED')}
                disabled={params.row.status === 'APPROVED'}
                sx={{ border: 1, borderRadius: 3, padding: 0.7 }}
              >
                <CheckCircleIcon />
              </IconButton>
            </Box>
          </Tooltip>
          <Tooltip title="Reject" arrow>
            <Box>
              <IconButton
                onClick={() => handleAcceptRequest(params.row.id, 'APPROVED')}
                disabled={params.row.status === 'APPROVED'}
                sx={{ border: 1, borderRadius: 3, padding: 0.7 }}
              >
                <IconifyIcon icon={'mdi:close'} />
              </IconButton>
            </Box>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return columns;
};
