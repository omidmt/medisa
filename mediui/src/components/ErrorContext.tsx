import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Alert, Snackbar } from '@mui/material';


interface ErrorContextProps {
  errorMessage: string | null;
  showError: (message: string) => void;
  hideError: () => void;
}

interface ErrorProviderProps {
  children: ReactNode;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within a ErrorProvider');
  }
  return context;
};

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const showError = (message: string) => {
    setErrorMessage(message);
    setOpen(true);
  };

  const hideError = () => {
    setOpen(false);
  };

  return (
    <ErrorContext.Provider value={{ errorMessage, showError, hideError }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={hideError}>
        <Alert onClose={hideError} severity="error">
          {errorMessage || 'An unexpected error occurred'}
        </Alert>
      </Snackbar>
    </ErrorContext.Provider>
  );
};
