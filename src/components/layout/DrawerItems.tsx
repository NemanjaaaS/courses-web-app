import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  MenuBook as BookIcon,
  Assignment as TestIcon,
  EmojiEvents as AwardIcon,
  People as UsersIcon,
  BarChart as ChartIcon,
  Receipt as TransactionIcon,
} from '@mui/icons-material';
// -------------------------------------------------------------------
// 1. Your sitemap hook
// -------------------------------------------------------------------
const useSiteMap = ({ isAdmin }: { isAdmin: boolean }) => {
  if (isAdmin) {
    return [
      {
        id: 'sidebar-nav-dashboard',
        title: 'Dashboard',
        path: '/app/admin/dashboard',
        icon: DashboardIcon,
      },
      {
        id: 'sidebar-nav-users',
        title: 'Users',
        path: '/app/admin/users',
        icon: UsersIcon,
      },
      {
        id: 'sidebar-nav-courses',
        title: 'Courses',
        path: '/app/admin/courses',
        icon: BookIcon,
      },
      {
        id: 'sidebar-nav-tests',
        title: 'Tests',
        path: '/app/admin/tests',
        icon: TestIcon,
      },
      {
        id: 'sidebar-nav-results',
        title: 'Results',
        path: '/app/admin/results',
        icon: ChartIcon,
      },
      {
        id: 'sidebar-nav-requests',
        title: 'Requests',
        path: '/app/admin/requests',
        icon: AwardIcon,
      },
      {
        id: 'sidebar-nav-transactions',
        title: 'Transactions',
        path: '/app/admin/transactions',
        icon: TransactionIcon,
      },
    ];
  } else {
    return [
      {
        id: 'sidebar-nav-dashboard',
        title: 'Dashboard',
        path: '/app/user/dashboard',
        icon: DashboardIcon,
      },
      {
        id: 'sidebar-nav-courses',
        title: 'Courses',
        path: '/app/user/courses',
        icon: BookIcon,
      },
      {
        id: 'sidebar-nav-my-tests',
        title: 'My Tests',
        path: '/app/user/my-tests',
        icon: TestIcon,
      },
      {
        id: 'sidebar-nav-certificates',
        title: 'Certificates',
        path: '/app/user/certificates',
        icon: AwardIcon,
      },
    ];
  }
};

// -------------------------------------------------------------------
// 2. Single navigation item (handles active state + navigation)
// -------------------------------------------------------------------
type NavItemProps = {
  route: ReturnType<typeof useSiteMap>[number];
  onClose?: () => void; // optional – close drawer on mobile
};

const NavItem: React.FC<NavItemProps> = ({ route }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === route.path || location.pathname.includes(`${route.path}/`);
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={isActive}
        onClick={() => navigate(route.path)}
        sx={{
          borderRadius: 2,
          mx: 0.5,
          bgcolor: isActive ? 'primary.darker' : 'transparent',
          color: isActive ? 'common.white' : 'text.secondary',
          '& .MuiListItemText-primary': {
            fontWeight: isActive ? 600 : 400,
          },
          '&:hover': {
            backgroundColor: isActive ? 'primary.darker' : 'action.hover',
          },
        }}
      >
        <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{<route.icon />}</ListItemIcon>
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
  const routes = useSiteMap({ isAdmin: true });
  return (
    <Stack sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <Box
        sx={{
          height: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 3,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SchoolIcon sx={{ fontSize: 20, color: 'white' }} />
        </Box>
        <Typography variant="h6" fontWeight={700} color="common.white">
          EduPlatform
        </Typography>
      </Box>
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
