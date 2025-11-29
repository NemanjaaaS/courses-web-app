import { Box, Drawer } from '@mui/material';
import { DrawerItems } from './DrawerItems';

type SidebarProps = {
  variant: 'permanent' | 'temporary';
  open: boolean;
  onClose?: () => void;
};

export const Sidebar = ({ variant, open, onClose }: SidebarProps) => {
  return (
    <Box
      component="nav"
      width={240}
      flexShrink={{ lg: 0 }}
      display={{ xs: 'none', lg: 'block' }}
      sx={{
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1); ',
        willChange: 'width',
      }}
    >
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            bgcolor: 'primary.main',
            borderRight: '1px solid',
            borderColor: 'divider',
            transition: 'width 0.25s ease',
            pt: 2,
          },
        }}
      >
        <DrawerItems onClose={onClose} />
      </Drawer>
    </Box>
  );
};
