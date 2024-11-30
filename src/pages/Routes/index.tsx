import React, { useState } from 'react';
import { Box } from '@mui/material';
import PageHeader from '@/components/common/PageHeader';
import CreateRouteForm from './CreateRouteForm';
import RouteList from './RouteList';

const RoutesModule: React.FC = () => {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  return (
    <Box>
      <PageHeader 
        title="Rotas" 
        onAdd={() => setIsCreateFormOpen(true)} 
      />
      <RouteList />
      <CreateRouteForm 
        open={isCreateFormOpen}
        onClose={() => setIsCreateFormOpen(false)}
      />
    </Box>
  );
};

export default RoutesModule;