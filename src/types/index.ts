export interface Vehicle {
  id: number;
  plate: string;
  model: string;
  year?: number;
  fuelType?: string;
  cargoCapacity?: number;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Driver {
  id: number;
  name: string;
  cpf: string;
  cnhCategory?: string;
  cnhNumber?: string;
  cnhExpiration?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Route {
  id: string;
  name: string;
  originState: string;
  destinationState: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Trip {
  id: number;
  competenceMonth: string;
  departureDate: Date;
  routeId: string;
  route: Route;
  vehicleId: number;
  vehicle: Vehicle;
  driverId: number;
  driver: Driver;
  initialKm: number;
  finalKm?: number;
  serviceStart: Date;
  serviceEnd?: Date;
  taskId?: string;
  invoiceNumber?: string;
  deliveryStatus: boolean;
  manifestNumber?: string;
  itemsQuantity?: number;
  invoiceTotal?: number;
  cubicMeters?: number;
  logisticsCost?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FuelRecord {
  id: number;
  tripId: number;
  trip: Trip;
  vehicleId: number;
  vehicle: Vehicle;
  liters: number;
  fuelType: string;
  pricePerLiter: number;
  totalCost: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}