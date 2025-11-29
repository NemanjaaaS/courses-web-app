import { Stack, Box } from '@mui/material';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
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
      <Sidebar variant="permanent" open />

      {/* Main content area */}
      <Stack flex={1} display="flex" overflow="hidden">
        <Topbar />

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            width: '100%',
            p: { xs: 2, md: 3 },
          }}
        >
          {children}
        </Box>
      </Stack>
    </Stack>
  );
};
