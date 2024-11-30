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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRoute } from '@/services/api';
import { Route } from '@/types';

interface RouteFormProps {
  open: boolean;
  onClose: () => void;
  route?: Route;
}

const states = [
  'MT', 'GO', 'DF', 'MG'
];

const RouteForm: React.FC<RouteFormProps> = ({ open, onClose, route }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Route>>();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createRoute, {
    onSuccess: () => {
      queryClient.invalidateQueries(['routes']);
      onClose();
    }
  });

  const onSubmit = (data: Partial<Route>) => {
    mutate(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {route ? 'Editar Rota' : 'Nova Rota'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('name', { required: 'Nome é obrigatório' })}
                label="Nome da Rota"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('originState', { required: 'Estado de origem é obrigatório' })}
                select
                label="Estado de Origem"
                fullWidth
                error={!!errors.originState}
                helperText={errors.originState?.message}
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('destinationState', { required: 'Estado de destino é obrigatório' })}
                select
                label="Estado de Destino"
                fullWidth
                error={!!errors.destinationState}
                helperText={errors.destinationState?.message}
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
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

export default RouteForm;