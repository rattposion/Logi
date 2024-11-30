import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import DataTable from '@/components/common/DataTable';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { getRoutes } from '@/services/api';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 130 },
  { field: 'name', headerName: 'Nome', width: 200 },
  { field: 'originState', headerName: 'Estado Origem', width: 130 },
  { field: 'destinationState', headerName: 'Estado Destino', width: 130 },
  { 
    field: 'createdAt', 
    headerName: 'Data Cadastro', 
    width: 150,
    valueFormatter: (params) => format(new Date(params.value), 'dd/MM/yyyy')
  },
];

const RouteList: React.FC = () => {
  const { data: routes, isLoading } = useQuery(['routes'], getRoutes);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DataTable 
      rows={routes || []}
      columns={columns}
      loading={isLoading}
    />
  );
};

export default RouteList;