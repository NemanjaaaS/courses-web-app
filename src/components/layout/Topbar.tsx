import {
  IconButton,
  AppBar,
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Stack,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
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

  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const pathName = pathArray.at(pathArray.length - 1);

  const mapTitleAndHelperText = (pathName: string) => {
    switch (pathName) {
      case 'dashboard':
        return (
          <Stack>
            <Typography fontSize={16} fontWeight={600}>
              Dashboard
            </Typography>
            <Typography color="text.secondary" fontSize={12}>
              Overview of platform activity and key metrics
            </Typography>
          </Stack>
        );

      case 'users':
        return (
          <Stack>
            <Typography fontSize={16} fontWeight={600}>
              Users
            </Typography>
            <Typography color="text.secondary">Manage users, roles, and account status</Typography>
          </Stack>
        );

      case 'courses':
        return (
          <Stack>
            <Typography fontSize={16} fontWeight={600}>
              Courses
            </Typography>
            <Typography color="text.secondary" fontSize={12}>
              Create, update, and organize learning content
            </Typography>
          </Stack>
        );

      case 'tests':
        return (
          <Stack>
            <Typography fontSize={16} fontWeight={600}>
              Tests
            </Typography>
            <Typography color="text.secondary" fontSize={12}>
              Configure tests and passing criteria
            </Typography>
          </Stack>
        );

      case 'results':
        return (
          <Stack>
            <Typography fontSize={16} fontWeight={600}>
              Results
            </Typography>
            <Typography color="text.secondary" fontSize={12}>
              Review user test results and performance
            </Typography>
          </Stack>
        );

      case 'requests':
        return (
          <Stack>
            <Typography fontSize={16} fontWeight={600}>
              Requests
            </Typography>
            <Typography color="text.secondary" fontSize={12}>
              Approve and manage issued requests
            </Typography>
          </Stack>
        );

      case 'transactions':
        return (
          <Stack>
            <Typography fontSize={16} fontWeight={600}>
              Transactions
            </Typography>
            <Typography color="text.secondary" fontSize={12}>
              Track payments and revenue history
            </Typography>
          </Stack>
        );

      default:
        return null;
    }
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
        {mapTitleAndHelperText(pathName ?? '')}
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
