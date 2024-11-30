import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  ListItemButton 
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  DirectionsCar as VehicleIcon,
  Person as DriverIcon,
  Route as RouteIcon,
  LocalGasStation as FuelIcon,
  Assessment as ReportsIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Veículos', icon: <VehicleIcon />, path: '/vehicles' },
    { text: 'Motoristas', icon: <DriverIcon />, path: '/drivers' },
    { text: 'Rotas', icon: <RouteIcon />, path: '/routes' },
    { text: 'Abastecimentos', icon: <FuelIcon />, path: '/fuel' },
    { text: 'Relatórios', icon: <ReportsIcon />, path: '/reports' },
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Navigation;