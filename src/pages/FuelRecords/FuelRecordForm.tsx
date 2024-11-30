import React from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFuelRecord, getVehicles, getTrips } from '@/services/api';
import { FuelRecord } from '@/types';

interface FuelRecordFormProps {
  open: boolean;
  onClose: () => void;
  fuelRecord?: FuelRecord;
}

const fuelTypes = ['DIESEL S10', 'GASOLINA COMUM', 'ETANOL'];

const FuelRecordForm: React.FC<FuelRecordFormProps> = ({ open, onClose, fuelRecord }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<Partial<FuelRecord>>();
  const queryClient = useQueryClient();

  const { data: vehicles } = useQuery(['vehicles'], getVehicles);
  const { data: trips } = useQuery(['trips'], getTrips);

  const { mutate } = useMutation(createFuelRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries(['fuelRecords']);
      onClose();
    }
  });

  const liters = watch('liters') || 0;
  const pricePerLiter = watch('pricePerLiter') || 0;
  const totalCost = liters * pricePerLiter;

  const onSubmit = (data: Partial<FuelRecord>) => {
    mutate({
      ...data,
      totalCost,
      date: new Date(data.date as unknown as string)
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {fuelRecord ? 'Editar Abastecimento' : 'Novo Abastecimento'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('date', { required: 'Data é obrigatória' })}
                label="Data"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('vehicleId', { required: 'Veículo é obrigatório' })}
                select
                label="Veículo"
                fullWidth
                error={!!errors.vehicleId}
                helperText={errors.vehicleId?.message}
              >
                {vehicles?.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.plate} - {vehicle.model}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('tripId')}
                select
                label="Viagem"
                fullWidth
              >
                {trips?.map((trip) => (
                  <MenuItem key={trip.id} value={trip.id}>
                    {trip.taskId || trip.id}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('liters', { 
                  required: 'Quantidade é obrigatória',
                  min: { value: 0.01, message: 'Quantidade deve ser maior que 0' }
                })}
                label="Litros"
                type="number"
                fullWidth
                inputProps={{ step: "0.01" }}
                error={!!errors.liters}
                helperText={errors.liters?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('fuelType', { required: 'Tipo de combustível é obrigatório' })}
                select
                label="Tipo de Combustível"
                fullWidth
                error={!!errors.fuelType}
                helperText={errors.fuelType?.message}
              >
                {fuelTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('pricePerLiter', { 
                  required: 'Preço por litro é obrigatório',
                  min: { value: 0.01, message: 'Preço deve ser maior que 0' }
                })}
                label="Preço por Litro"
                type="number"
                fullWidth
                inputProps={{ step: "0.01" }}
                error={!!errors.pricePerLiter}
                helperText={errors.pricePerLiter?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Custo Total"
                value={`R$ ${totalCost.toFixed(2)}`}
                fullWidth
                disabled
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FuelRecordForm;