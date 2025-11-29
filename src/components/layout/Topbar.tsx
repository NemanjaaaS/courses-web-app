import { Stack, IconButton } from '@mui/material';
import IconifyIcon from '../base/IconifyIcon';

export const Topbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={2}
      py={1.5}
      bgcolor="primary.main"
      sx={{
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      {/* Right side (profile, notifications, etc) */}
      <Stack direction="row" pr={2} width={'100%'} display="flex" justifyContent={'end'}>
        <IconButton sx={{ color: 'white', border: 0 }} disableRipple>
          <IconifyIcon icon="mdi:user" />
        </IconButton>
      </Stack>
    </Stack>
  );
};
