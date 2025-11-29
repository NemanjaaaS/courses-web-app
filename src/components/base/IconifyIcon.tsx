import React from 'react';
import { Box } from '@mui/material';
import { Icon } from '@iconify/react';

// Type-only imports (required with verbatimModuleSyntax)
import type { BoxProps } from '@mui/material';
import type { IconProps as IconifyIconProps } from '@iconify/react';

interface IconifyProps extends BoxProps {
  icon: IconifyIconProps['icon'] | React.FC<React.SVGProps<SVGSVGElement>>;
  width?: string | number;
  height?: string | number;
  iconSx?: React.CSSProperties;
}

const IconifyIcon = ({ icon, sx, width, height, iconSx, ...rest }: IconifyProps) => {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: '1 / 1',
        ...sx,
      }}
      {...rest}
    >
      {typeof icon === 'function' ? (
        React.createElement(icon, {
          width: width ?? 24,
          height: height ?? 24,
          style: iconSx,
        })
      ) : (
        <Icon icon={icon} width={width} height={height} style={iconSx} />
      )}
    </Box>
  );
};

export default IconifyIcon;
