import { Typography, Box, Avatar, Chip } from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

export const getTransactionsColumns = () => {
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
          label={params.value === 'APPROVED' ? 'Completed' : 'Pending'}
          color={params.value === 'APPROVED' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
  ];

  return columns;
};
