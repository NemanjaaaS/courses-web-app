import { Stack, Box, useTheme, useMediaQuery } from '@mui/material';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useState } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Stack
      width={'100vw'}
      maxHeight="100dvh"
      height={'100dvh'}
      overflow={'hidden'}
      direction={'row'}
      sx={{
        bgcolor: 'background.default',
        '@media print': {
          overflow: 'visible !important',
          height: 'inherit  ',
        },
      }}
    >
      {/* Desktop sidebar */}
      {!isMobile && <Sidebar variant="permanent" open />}

      {/* Mobile sidebar */}
      {isMobile && <Sidebar variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} />}

      {/* Main content area */}
      <Stack flex={1} display="flex" overflow="hidden">
        <Topbar onDrawerToggle={handleDrawerToggle} />

        {/* Page content */}
        <Box component="main">{children}</Box>
      </Stack>
    </Stack>
  );
};
