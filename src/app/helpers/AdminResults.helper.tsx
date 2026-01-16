import { Typography, Box, LinearProgress, Chip } from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  {
    field: 'userId',
    headerName: 'Korisnik ID',
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => <Typography fontWeight={500}>#{params.value}</Typography>,
  },
  {
    field: 'courseName',
    headerName: 'Kurs',
    flex: 1,
    minWidth: 280,
  },
  {
    field: 'score',
    headerName: 'Rezultat',
    minWidth: 260,
    flex: 1,

    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', height: '100%' }}>
        <LinearProgress
          variant="determinate"
          value={params.value}
          sx={{
            flex: 1,
            height: 8,
            borderRadius: 4,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              bgcolor: params.value >= 70 ? 'success.main' : params.value > 0 ? 'warning.main' : 'grey.400',
            },
          }}
        />
        <Typography variant="body2" fontWeight={500} sx={{ minWidth: 40 }}>
          {params.value}%
        </Typography>
      </Box>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 120,
    flex: 1,

    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.value === 'completed' ? 'Završeno' : 'U toku'}
        size="small"
        color={params.value === 'completed' ? 'success' : 'warning'}
        variant="outlined"
      />
    ),
  },
  {
    field: 'passed',
    headerName: 'Položeno',
    minWidth: 120,
    flex: 1,

    renderCell: (params: GridRenderCellParams) =>
      params.row.status === 'completed' ? (
        <Chip label={params.value ? 'Da' : 'Ne'} size="small" color={params.value ? 'success' : 'error'} variant="outlined" />
      ) : null,
  },
  {
    field: 'completedAt',
    headerName: 'Datum',
    flex: 1,
    minWidth: 130,
    valueFormatter: (value: string) => (value ? new Date(value).toLocaleDateString('sr-RS') : '-'),
  },
];
