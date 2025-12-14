import { MoreVert } from '@mui/icons-material';
import { Chip, IconButton } from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

export const userColumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Korisnik',
    minWidth: 260,
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'role',
    headerName: 'Uloga',
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.value === 'admin' ? 'Admin' : 'Korisnik'}
        size="small"
        color={params.value === 'admin' ? 'primary' : 'default'}
      />
    ),
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.value === 'active' ? 'Aktivan' : 'Neaktivan'}
        size="small"
        color={params.value === 'active' ? 'success' : 'error'}
        variant="outlined"
      />
    ),
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'joinedAt',
    headerName: 'Registrovan',
    valueFormatter: (value: string) => new Date(value).toLocaleDateString('sr-RS'),
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'enrolledCourses',
    headerName: 'Kursevi',
    align: 'center',
    headerAlign: 'center',
    minWidth: 200,
  },
  {
    field: 'completedTests',
    headerName: 'Testovi',
    align: 'center',
    headerAlign: 'center',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'actions',
    headerName: '',
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <IconButton size="small" onClick={() => console.log('open', params)}>
        <MoreVert />
      </IconButton>
    ),
  },
];
