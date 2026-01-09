import { Paper, Stack, Menu, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useGetUsersQuery } from '../../api/api';
import { getUserColumns } from '../../helpers/UsersTable.helper';
import { useState } from 'react';

export const UsersRoute = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, userId: string) => {
    setMenuAnchor(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedUserId(null);
  };

  const columns = getUserColumns(handleMenuOpen);

  return (
    <Stack overflow="auto" height="calc(100vh - 65px)" p={1}>
      <Paper component={Stack} height="100%" width="100%" sx={{ borderRadius: 3 }}>
        <DataGrid rows={users} columns={columns} loading={isLoading} disableRowSelectionOnClick sx={{ height: '100%', p: 1 }} />

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          slotProps={{ paper: { sx: { borderRadius: 2 } } }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem
            onClick={() => {
              console.log('View user', selectedUserId);
              handleMenuClose();
            }}
          >
            View
          </MenuItem>

          <MenuItem
            onClick={() => {
              console.log('Edit user', selectedUserId);
              handleMenuClose();
            }}
          >
            Edit
          </MenuItem>

          <MenuItem
            onClick={() => {
              console.log('Delete user', selectedUserId);
              handleMenuClose();
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </Paper>
    </Stack>
  );
};
