import { Outlet } from 'react-router';
import { AuthLayout } from './AuthLayout';

export const AuthRoot = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};
