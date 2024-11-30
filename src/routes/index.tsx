import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout';
import Dashboard from '../pages/Dashboard';
import Vehicles from '../pages/Vehicles';
import Drivers from '../pages/Drivers';
import RoutesModule from '../pages/Routes';
import FuelRecords from '../pages/FuelRecords';
import Reports from '../pages/Reports';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="drivers" element={<Drivers />} />
        <Route path="routes" element={<RoutesModule />} />
        <Route path="fuel" element={<FuelRecords />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;