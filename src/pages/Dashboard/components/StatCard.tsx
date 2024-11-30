import React from 'react';
import { Paper, Typography } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h4">
        {value}
      </Typography>
    </Paper>
  );
};

export default StatCard;