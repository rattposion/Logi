import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import PageHeader from '@/components/common/PageHeader';
import DataTable from '@/components/common/DataTable';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { getDrivers } from '@/services/api';
import DriverForm from './DriverForm';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Nome', width: 200 },
  { field: 'cpf', headerName: 'CPF', width: 150 },
  { field: 'cnhCategory', headerName: 'Categoria CNH', width: 130 },
  { field: 'cnhNumber', headerName: 'Nº CNH', width: 150 },
  { 
    field: 'cnhExpiration', 
    headerName: 'Vencimento CNH', 
    width: 150,
    valueFormatter: (params) => 
      params.value ? format(new Date(params.value), 'dd/MM/yyyy') : '-'
  },
  { 
    field: 'createdAt', 
    headerName: 'Data Cadastro', 
    width: 150,
    valueFormatter: (params) => format(new Date(params.value), 'dd/MM/yyyy')
  },
];

const Drivers: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: drivers, isLoading } = useQuery(['drivers'], getDrivers);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <PageHeader 
        title="Motoristas" 
        onAdd={() => setIsFormOpen(true)} 
      />
      <DataTable 
        rows={drivers || []}
        columns={columns}
        loading={isLoading}
      />
      <DriverForm 
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default Drivers;