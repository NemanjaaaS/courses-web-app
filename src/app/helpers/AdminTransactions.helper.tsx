import { Typography, Box, Avatar, Chip } from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

export const getTransactionsColumns = () => {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Box height={'100%'} alignItems={'center'} display={'flex'}>
          <Typography fontFamily="monospace" fontSize={13}>
            #{params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'userName',
      headerName: 'Korisnik',
      flex: 1,
      minWidth: 180,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, height: '100%' }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 28, height: 28, fontSize: 12 }}>{params.value.charAt(0)}</Avatar>
          <Typography variant="body2" fontWeight={500}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'courseName',
      headerName: 'Kurs',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'amount',
      headerName: 'Iznos',
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Box height={'100%'} alignItems={'center'} display={'flex'}>
          <Typography fontWeight={600}>{params.value.toLocaleString('sr-RS')} RSD</Typography>
        </Box>
      ),
    },
    {
      field: 'date',
      headerName: 'Datum',
      width: 130,
      valueFormatter: (value: string) => new Date(value).toLocaleDateString('sr-RS'),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value === 'completed' ? 'Finished' : params.value === 'pending' ? 'Na čekanju' : 'Refundirano'}
          size="small"
          color={params.value === 'completed' ? 'success' : params.value === 'pending' ? 'warning' : 'error'}
          variant="outlined"
        />
      ),
    },
  ];
  return columns;
};
