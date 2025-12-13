import { IconButton, AppBar, Avatar, Box, Divider, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Menu as MenuIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useState } from 'react';
type TopbarProps = {
  onDrawerToggle: () => void;
};
export const Topbar = ({ onDrawerToggle }: TopbarProps) => {
  const user = {
    name: 'Nemanja',
    surname: 'Stefanovic',
  };
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleMenuClose();
    console.log('Log out');
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
    >
      <Toolbar>
        <IconButton edge="start" onClick={onDrawerToggle} sx={{ mr: 2, display: { lg: 'none' } }}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ flex: 1 }} />

        <IconButton
          onClick={handleMenuOpen}
          disableRipple
          sx={{
            gap: 1,
            '&:focus-visible': {
              outline: 'none',
            },
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: 14,
            }}
          >
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          <Typography variant="body2" fontWeight={500} sx={{ display: { xs: 'none', sm: 'block' } }}>
            {user?.name}
          </Typography>
          <ArrowDownIcon fontSize="small" color="action" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Podešavanja
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            Odjavi se
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
