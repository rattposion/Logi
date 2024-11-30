import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { FuelRecord } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface FuelConsumptionChartProps {
  fuelRecords: FuelRecord[];
}

const FuelConsumptionChart: React.FC<FuelConsumptionChartProps> = ({ fuelRecords }) => {
  const totalCost = fuelRecords.reduce((acc, record) => acc + record.totalCost, 0);
  const totalLiters = fuelRecords.reduce((acc, record) => acc + record.liters, 0);
  const averageCost = totalLiters > 0 ? totalCost / totalLiters : 0;

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Consumo de Combustível
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Total Gasto: {formatCurrency(totalCost)}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Total Litros: {totalLiters.toFixed(2)}L
        </Typography>
        <Typography variant="body1">
          Preço Médio: {formatCurrency(averageCost)}/L
        </Typography>
      </Box>
    </Paper>
  );
};

export default FuelConsumptionChart;