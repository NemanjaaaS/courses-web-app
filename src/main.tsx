import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppRouter } from './app/router.tsx';
import { AppProvider } from './app/Provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider children={<AppRouter />}></AppProvider>
  </StrictMode>
);
