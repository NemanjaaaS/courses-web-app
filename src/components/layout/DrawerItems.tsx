import React from 'react';
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';

// -------------------------------------------------------------------
// 1. Your sitemap hook
// -------------------------------------------------------------------
const useSitemap = () => {
  return [
    {
      id: 'sidebar-nav-dashboard',
      title: 'Dashboard',
      path: '/app/dashboard',
    },
    {
      id: 'sidebar-nav-courses',
      title: 'Courses',
      path: '/app/courses',
    },
  ];
};

// -------------------------------------------------------------------
// 2. Single navigation item (handles active state + navigation)
// -------------------------------------------------------------------
type NavItemProps = {
  route: ReturnType<typeof useSitemap>[number];
  onClose?: () => void; // optional – close drawer on mobile
};

const NavItem: React.FC<NavItemProps> = ({ route }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selected = location.pathname === route.path;

  const handleClick = () => {
    navigate(route.path);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton selected={selected} onClick={handleClick}>
        <ListItemText primary={route.title} />
      </ListItemButton>
    </ListItem>
  );
};

// -------------------------------------------------------------------
// 3. Drawer items component
// -------------------------------------------------------------------

type DrawerItemsProps = {
  onClose?: () => void; // pass drawer close handler if needed
};

export const DrawerItems: React.FC<DrawerItemsProps> = () => {
  const routes = useSitemap();
  const navigate = useNavigate();
  return (
    <Stack>
      <Stack sx={sidebarStyles.topSection}>
        <Button onClick={() => navigate('/')}>
          <Typography variant="h5" color="white" fontWeight={600} letterSpacing={1}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: 'auto',
              }}
            >
              <Typography>Courses Logo</Typography>
            </Box>
          </Typography>
        </Button>
      </Stack>
      <List component="nav" sx={sidebarStyles.navigationList}>
        {routes.map((route) => (
          <NavItem key={route.id} route={route} />
        ))}
      </List>
    </Stack>
  );
};

const sidebarStyles = {
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },
  topSection: {
    pt: 2,
    pb: 2,
    position: 'sticky',

    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 1000,
    bgcolor: 'sidebar.primary',
  },
  bottomSection: {
    py: 2,
    px: 2,
    bgcolor: 'sidebar.primary',
  },
  collapseButton: {
    borderRadius: 2,
    width: 26,
    height: 26,
  },
  navigationList: {
    overflow: 'auto',
    flexGrow: 1,
    px: 2,
  },
};
