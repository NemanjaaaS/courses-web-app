import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { initializeAuth } from './pages/auth/user/userSlice';
import { AppProvider } from './Provider';
import { AppRouter } from './router';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
