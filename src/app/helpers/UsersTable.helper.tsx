import { Chip, Box, Typography } from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

export const getUserColumns = () => {
  const columns: GridColDef[] = [
    {
      field: 'fullName',
      headerName: 'User',
      minWidth: 200,
      flex: 1,
    },

    {
      field: 'email',
      headerName: 'Email',
      minWidth: 220,
      flex: 1,
    },
    {
      field: 'enrolledCourses',
      headerName: 'Enrolled Courses',
      minWidth: 160,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ height: '100%', alignItems: 'center', display: 'flex' }}>
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'completedCourses',
      headerName: 'Completed Courses',
      minWidth: 180,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ height: '100%', alignItems: 'center', display: 'flex' }}>
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'passedTests',
      headerName: 'Passed Tests',
      minWidth: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <Chip label={params.value} size="small" color="success" />,
    },
    {
      field: 'failedTests',
      headerName: 'Failed Tests',
      minWidth: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <Chip label={params.value} size="small" color="error" />,
    },
    // {
    //   field: 'actions',
    //   headerName: '',
    //   sortable: false,
    //   align: 'right',
    //   minWidth: 80,
    //   renderCell: (params: GridRenderCellParams) => (
    //     <IconButton size="small" onClick={(event) => handleMenuOpen(event, params.row.id)}>
    //       <MoreVert />
    //     </IconButton>
    //   ),
    // },
  ];

  return columns;
};
