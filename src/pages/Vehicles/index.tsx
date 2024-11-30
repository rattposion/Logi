import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import PageHeader from '@/components/common/PageHeader';
import DataTable from '@/components/common/DataTable';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { getVehicles } from '@/services/api';
import VehicleForm from './VehicleForm';

const columns: GridColDef[] = [
  { field: 'plate', headerName: 'Placa', width: 130 },
  { field: 'model', headerName: 'Modelo', width: 200 },
  { field: 'year', headerName: 'Ano', width: 100 },
  { field: 'fuelType', headerName: 'Combustível', width: 130 },
  { field: 'location', headerName: 'Localização', width: 150 },
  { 
    field: 'createdAt', 
    headerName: 'Data Cadastro', 
    width: 150,
    valueFormatter: (params) => format(new Date(params.value), 'dd/MM/yyyy')
  },
];

const Vehicles: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: vehicles, isLoading } = useQuery(['vehicles'], getVehicles);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <PageHeader 
        title="Veículos" 
        onAdd={() => setIsFormOpen(true)} 
      />
      <DataTable 
        rows={vehicles || []}
        columns={columns}
        loading={isLoading}
      />
      <VehicleForm 
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default Vehicles;