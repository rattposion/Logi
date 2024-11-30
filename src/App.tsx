import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';
import { ToastProvider } from './hooks/useToast';
import { ConfirmDialogProvider } from './hooks/useConfirmDialog';
import AppRoutes from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5000
    }
  }
});

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  },
  ptBR
);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <ConfirmDialogProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ConfirmDialogProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;