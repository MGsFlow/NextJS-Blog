'use client';

import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useBlogStore } from '../store/blogStore';

export const SuccessAlert: React.FC = () => {
  const { success, clearSuccess } = useBlogStore();

  return (
    <Snackbar
      open={!!success}
      autoHideDuration={3000}
      onClose={clearSuccess}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={clearSuccess}
        severity="success"
        sx={{ width: '100%' }}
      >
        {success}
      </Alert>
    </Snackbar>
  );
}; 