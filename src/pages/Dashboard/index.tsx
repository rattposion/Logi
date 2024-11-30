import React from 'react';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '@/components/common/PageHeader';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { getTrips, getVehicles, getDrivers, getFuelRecords } from '@/services/api';
import DashboardStats from './components/DashboardStats';
import RecentTrips from './components/RecentTrips';
import FuelConsumptionChart from './components/FuelConsumptionChart';

const Dashboard: React.FC = () => {
  const { data: trips, isLoading: tripsLoading } = useQuery(['trips'], getTrips);
  const { data: vehicles, isLoading: vehiclesLoading } = useQuery(['vehicles'], getVehicles);
  const { data: drivers, isLoading: driversLoading } = useQuery(['drivers'], getDrivers);
  const { data: fuelRecords, isLoading: fuelLoading } = useQuery(['fuelRecords'], getFuelRecords);

  if (tripsLoading || vehiclesLoading || driversLoading || fuelLoading) {
    return <LoadingSpinner />;
  }

  const totalRevenue = trips?.reduce((acc, trip) => acc + (trip.invoiceTotal || 0), 0) || 0;

  return (
    <div>
      <PageHeader title="Dashboard" />
      
      <DashboardStats
        trips={trips || []}
        vehicles={vehicles || []}
        drivers={drivers || []}
        totalRevenue={totalRevenue}
      />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          {trips && <RecentTrips trips={trips} />}
        </Grid>
        
        <Grid item xs={12} md={4}>
          {fuelRecords && <FuelConsumptionChart fuelRecords={fuelRecords} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;