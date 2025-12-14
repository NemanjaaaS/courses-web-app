import { Paper, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useGetUsersQuery } from '../../api/api';
import { userColumns } from '../../helpers/UsersTable.helper';

export const UsersRoute = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();

  return (
    <Stack overflow={'auto'} height="calc(100vh - 65px)" p={1}>
      <Paper component={Stack} display={'flex'} overflow={'auto'} height="100%" width={'100%'} sx={{ borderRadius: 3 }}>
        <DataGrid columns={userColumns} rows={users} loading={isLoading} sx={{ height: '100%', p: 1 }} />
      </Paper>
    </Stack>
  );
};
