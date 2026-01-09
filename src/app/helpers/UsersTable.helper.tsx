import { MoreVert } from '@mui/icons-material';
import { Chip, IconButton } from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

export const getUserColumns = (handleMenuOpen: (event: React.MouseEvent<HTMLElement>, userId: string) => void) => {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'User',
      minWidth: 160,
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
      headerName: 'Role',
      minWidth: 120,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value === 'admin' ? 'Admin' : 'User'}
          size="small"
          color={params.value === 'admin' ? 'primary' : 'default'}
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value === 'active' ? 'Active' : 'Inactive'}
          size="small"
          color={params.value === 'active' ? 'success' : 'error'}
          variant="outlined"
        />
      ),
    },
    {
      field: 'joinedAt',
      headerName: 'Joined',
      minWidth: 130,
      flex: 1,
      valueFormatter: (value: string) => new Date(value).toLocaleDateString('en-US'),
    },
    {
      field: 'enrolledCourses',
      headerName: 'Courses',
      minWidth: 120,
    },
    {
      field: 'completedTests',
      headerName: 'Completed Tests',
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      pinnable: true,
      align: 'right',
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="small" onClick={(event) => handleMenuOpen(event, params.row.id)}>
          <MoreVert />
        </IconButton>
      ),
    },
  ];

  return columns;
};
