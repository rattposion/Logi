import React from 'react';
import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material';
import { format } from 'date-fns';
import { Trip } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface RecentTripsProps {
  trips: Trip[];
}

const RecentTrips: React.FC<RecentTripsProps> = ({ trips }) => {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Últimas Viagens
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Rota</TableCell>
              <TableCell>Motorista</TableCell>
              <TableCell>Veículo</TableCell>
              <TableCell align="right">Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.slice(0, 5).map((trip) => (
              <TableRow key={trip.id}>
                <TableCell>{format(new Date(trip.departureDate), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{trip.route.name}</TableCell>
                <TableCell>{trip.driver.name}</TableCell>
                <TableCell>{trip.vehicle.plate}</TableCell>
                <TableCell align="right">
                  {trip.invoiceTotal ? formatCurrency(trip.invoiceTotal) : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RecentTrips;