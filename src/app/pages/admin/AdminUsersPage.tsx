import { Paper, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useGetAllUsersQuery } from '../../api/api';
import { getUserColumns } from '../../helpers/UsersTable.helper';

export const UsersRoute = () => {
  const { data: users = [], isLoading } = useGetAllUsersQuery();

  const columns = getUserColumns();

  return (
    <Stack overflow="auto" height="calc(100vh - 65px)" p={2}>
      <Paper component={Stack} height="100%" width="100%" sx={{ borderRadius: 3 }}>
        <DataGrid
          rows={users}
          columns={columns}
          loading={isLoading}
          disableRowSelectionOnClick
          sx={{ height: '100%', p: 1, borderRadius: 3 }}
          showToolbar
        />
      </Paper>
    </Stack>
  );
};
