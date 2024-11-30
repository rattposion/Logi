import React from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVehicle } from '@/services/api';
import { Vehicle } from '@/types';

interface VehicleFormProps {
  open: boolean;
  onClose: () => void;
  vehicle?: Vehicle;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ open, onClose, vehicle }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Vehicle>>();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createVehicle, {
    onSuccess: () => {
      queryClient.invalidateQueries(['vehicles']);
      onClose();
    }
  });

  const onSubmit = (data: Partial<Vehicle>) => {
    mutate(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {vehicle ? 'Editar Veículo' : 'Novo Veículo'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('plate', { required: 'Placa é obrigatória' })}
                label="Placa"
                fullWidth
                error={!!errors.plate}
                helperText={errors.plate?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('model', { required: 'Modelo é obrigatório' })}
                label="Modelo"
                fullWidth
                error={!!errors.model}
                helperText={errors.model?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('year')}
                label="Ano"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('fuelType')}
                label="Tipo de Combustível"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('location')}
                label="Localização"
                fullWidth
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

export default VehicleForm;