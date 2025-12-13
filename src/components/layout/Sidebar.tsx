import { Box, Drawer } from '@mui/material';
import { DrawerItems } from './DrawerItems';

type SidebarProps = {
  variant: 'permanent' | 'temporary';
  open: boolean;
  onClose?: () => void;
};

export const Sidebar = ({ variant, open, onClose }: SidebarProps) => {
  return (
    <Box component="nav" sx={{ width: { lg: 240 }, flexShrink: { lg: 0 } }}>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            bgcolor: 'sidebar.primary',
            borderRight: '1px solid',
            borderColor: 'divider',
            pt: 2,
          },
        }}
      >
        <DrawerItems onClose={onClose} />
      </Drawer>
    </Box>
  );
};
