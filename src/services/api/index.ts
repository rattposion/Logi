import axios from 'axios';
import { Trip, Vehicle, Driver, Route, FuelRecord } from '@/types';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Error interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Routes
export const getRoutes = () => api.get<Route[]>('/routes').then(res => res.data);
export const getRoute = (id: string) => api.get<Route>(`/routes/${id}`).then(res => res.data);
export const createRoute = (data: Partial<Route>) => api.post<Route>('/routes', data).then(res => res.data);
export const updateRoute = (id: string, data: Partial<Route>) => api.put<Route>(`/routes/${id}`, data).then(res => res.data);
export const deleteRoute = (id: string) => api.delete(`/routes/${id}`);

// Vehicles
export const getVehicles = () => api.get<Vehicle[]>('/vehicles').then(res => res.data);
export const getVehicle = (id: number) => api.get<Vehicle>(`/vehicles/${id}`).then(res => res.data);
export const createVehicle = (data: Partial<Vehicle>) => api.post<Vehicle>('/vehicles', data).then(res => res.data);
export const updateVehicle = (id: number, data: Partial<Vehicle>) => api.put<Vehicle>(`/vehicles/${id}`, data).then(res => res.data);
export const deleteVehicle = (id: number) => api.delete(`/vehicles/${id}`);

// Drivers
export const getDrivers = () => api.get<Driver[]>('/drivers').then(res => res.data);
export const getDriver = (id: number) => api.get<Driver>(`/drivers/${id}`).then(res => res.data);
export const createDriver = (data: Partial<Driver>) => api.post<Driver>('/drivers', data).then(res => res.data);
export const updateDriver = (id: number, data: Partial<Driver>) => api.put<Driver>(`/drivers/${id}`, data).then(res => res.data);
export const deleteDriver = (id: number) => api.delete(`/drivers/${id}`);

// Trips
export const getTrips = () => api.get<Trip[]>('/trips').then(res => res.data);
export const getTrip = (id: number) => api.get<Trip>(`/trips/${id}`).then(res => res.data);
export const createTrip = (data: Partial<Trip>) => api.post<Trip>('/trips', data).then(res => res.data);
export const updateTrip = (id: number, data: Partial<Trip>) => api.put<Trip>(`/trips/${id}`, data).then(res => res.data);
export const deleteTrip = (id: number) => api.delete(`/trips/${id}`);

// Fuel Records
export const getFuelRecords = () => api.get<FuelRecord[]>('/fuel-records').then(res => res.data);
export const getFuelRecord = (id: number) => api.get<FuelRecord>(`/fuel-records/${id}`).then(res => res.data);
export const createFuelRecord = (data: Partial<FuelRecord>) => api.post<FuelRecord>('/fuel-records', data).then(res => res.data);
export const updateFuelRecord = (id: number, data: Partial<FuelRecord>) => api.put<FuelRecord>(`/fuel-records/${id}`, data).then(res => res.data);
export const deleteFuelRecord = (id: number) => api.delete(`/fuel-records/${id}`);

export default api;