import React from 'react';
import { Grid } from '@mui/material';
import StatCard from './StatCard';
import { formatCurrency } from '@/utils/formatters';
import { Trip, Vehicle, Driver } from '@/types';

interface DashboardStatsProps {
  trips: Trip[];
  vehicles: Vehicle[];
  drivers: Driver[];
  totalRevenue: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  trips,
  vehicles,
  drivers,
  totalRevenue
}) => {
  const activeTrips = trips.filter(trip => !trip.serviceEnd);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="Viagens Ativas" 
          value={activeTrips.length.toString()} 
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="Veículos" 
          value={vehicles.length.toString()} 
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="Motoristas" 
          value={drivers.length.toString()} 
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="Faturamento" 
          value={formatCurrency(totalRevenue)} 
        />
      </Grid>
    </Grid>
  );
};

export default DashboardStats;