import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner: React.FC = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',
        width: '100%'
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;