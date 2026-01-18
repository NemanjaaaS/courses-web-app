import { Box, Avatar, Typography, Chip, Button } from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const getRequestsColumns = (handleAcceptRequest: (id: number) => void) => {
  const columns: GridColDef[] = [
    {
      field: 'userName',
      headerName: 'Korisnik',
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
          <Avatar sx={{ bgcolor: 'primary.light', width: 28, height: 28, fontSize: 14 }}>{params.value.charAt(0)}</Avatar>

          <Typography fontWeight="medium">{params.row.userName}</Typography>
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
      field: 'issuedAt',
      headerName: 'Datum izdavanja',
      width: 150,
      valueFormatter: (value: string) => new Date(value).toLocaleDateString('sr-RS'),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value === 'approved' ? 'Odobreno' : 'Na čekanju'}
          color={params.value === 'approved' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Akcija',
      width: 130,
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        params.row.status === 'pending' ? (
          <Button
            size="small"
            variant="contained"
            startIcon={<CheckCircleIcon />}
            onClick={() => handleAcceptRequest(params.row.id)}
          >
            Odobri
          </Button>
        ) : null,
    },
  ];
  return columns;
};
