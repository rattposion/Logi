import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import PageHeader from '@/components/common/PageHeader';
import DataTable from '@/components/common/DataTable';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { getFuelRecords } from '@/services/api';
import FuelRecordForm from './FuelRecordForm';

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Data', width: 130,
    valueFormatter: (params) => format(new Date(params.value), 'dd/MM/yyyy')
  },
  { field: 'vehicle.plate', headerName: 'Placa', width: 120 },
  { field: 'trip.taskId', headerName: 'ID Tarefa', width: 130 },
  { field: 'liters', headerName: 'Litros', width: 100,
    valueFormatter: (params) => params.value.toFixed(2)
  },
  { field: 'fuelType', headerName: 'Combustível', width: 130 },
  { field: 'pricePerLiter', headerName: 'Preço/L', width: 100,
    valueFormatter: (params) => `R$ ${params.value.toFixed(2)}`
  },
  { field: 'totalCost', headerName: 'Total', width: 130,
    valueFormatter: (params) => `R$ ${params.value.toFixed(2)}`
  }
];

const FuelRecords: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: fuelRecords, isLoading } = useQuery(['fuelRecords'], getFuelRecords);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <PageHeader 
        title="Abastecimentos" 
        onAdd={() => setIsFormOpen(true)} 
      />
      <DataTable 
        rows={fuelRecords || []}
        columns={columns}
        loading={isLoading}
      />
      <FuelRecordForm 
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default FuelRecords;