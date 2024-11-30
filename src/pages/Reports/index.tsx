import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Grid, 
  Paper, 
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import PageHeader from '@/components/common/PageHeader';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { getFuelRecords, getTrips } from '@/services/api';

const Reports: React.FC = () => {
  const { data: fuelRecords, isLoading: fuelLoading } = useQuery(['fuelRecords'], getFuelRecords);
  const { data: trips, isLoading: tripsLoading } = useQuery(['trips'], getTrips);

  if (fuelLoading || tripsLoading) {
    return <LoadingSpinner />;
  }

  const totalFuelCost = fuelRecords?.reduce((acc, record) => acc + record.totalCost, 0) || 0;
  const totalKm = trips?.reduce((acc, trip) => acc + ((trip.finalKm || 0) - trip.initialKm), 0) || 0;
  const averageFuelCost = totalKm > 0 ? totalFuelCost / totalKm : 0;

  const vehicleFuelStats = fuelRecords?.reduce((acc: any, record) => {
    if (!acc[record.vehicle.plate]) {
      acc[record.vehicle.plate] = {
        liters: 0,
        cost: 0,
        count: 0
      };
    }
    acc[record.vehicle.plate].liters += record.liters;
    acc[record.vehicle.plate].cost += record.totalCost;
    acc[record.vehicle.plate].count += 1;
    return acc;
  }, {});

  return (
    <div>
      <PageHeader title="Relatórios" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Custo Total com Combustível
            </Typography>
            <Typography variant="h4">
              R$ {totalFuelCost.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quilometragem Total
            </Typography>
            <Typography variant="h4">
              {totalKm.toFixed(2)} km
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Custo Médio por Km
            </Typography>
            <Typography variant="h4">
              R$ {averageFuelCost.toFixed(2)}/km
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Consumo por Veículo
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Placa</TableCell>
                    <TableCell align="right">Litros</TableCell>
                    <TableCell align="right">Custo Total</TableCell>
                    <TableCell align="right">Abastecimentos</TableCell>
                    <TableCell align="right">Média por Abastecimento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(vehicleFuelStats || {}).map(([plate, stats]: [string, any]) => (
                    <TableRow key={plate}>
                      <TableCell>{plate}</TableCell>
                      <TableCell align="right">{stats.liters.toFixed(2)}</TableCell>
                      <TableCell align="right">R$ {stats.cost.toFixed(2)}</TableCell>
                      <TableCell align="right">{stats.count}</TableCell>
                      <TableCell align="right">
                        R$ {(stats.cost / stats.count).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Reports;