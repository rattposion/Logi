import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

interface ConfirmDialogContextType {
  confirm: (options: ConfirmDialogOptions) => Promise<boolean>;
}

interface ConfirmDialogOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);

export const ConfirmDialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    options: ConfirmDialogOptions;
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = useCallback((options: ConfirmDialogOptions) => {
    return new Promise<boolean>((resolve) => {
      setDialog({
        isOpen: true,
        options,
        resolve
      });
    });
  }, []);

  const handleClose = useCallback((value: boolean) => {
    if (dialog) {
      dialog.resolve(value);
      setDialog(null);
    }
  }, [dialog]);

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      {dialog && (
        <Dialog
          open={dialog.isOpen}
          onClose={() => handleClose(false)}
        >
          <DialogTitle>{dialog.options.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {dialog.options.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(false)}>
              {dialog.options.cancelText || 'Cancel'}
            </Button>
            <Button onClick={() => handleClose(true)} variant="contained" autoFocus>
              {dialog.options.confirmText || 'Confirm'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </ConfirmDialogContext.Provider>
  );
};

export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error('useConfirmDialog must be used within a ConfirmDialogProvider');
  }
  return context;
};