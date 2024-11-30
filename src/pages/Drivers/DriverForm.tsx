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
import { createDriver } from '@/services/api';
import { Driver } from '@/types';

interface DriverFormProps {
  open: boolean;
  onClose: () => void;
  driver?: Driver;
}

const cnhCategories = ['A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE'];

const DriverForm: React.FC<DriverFormProps> = ({ open, onClose, driver }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Driver>>();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createDriver, {
    onSuccess: () => {
      queryClient.invalidateQueries(['drivers']);
      onClose();
    }
  });

  const onSubmit = (data: Partial<Driver>) => {
    mutate(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {driver ? 'Editar Motorista' : 'Novo Motorista'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('name', { required: 'Nome é obrigatório' })}
                label="Nome Completo"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('cpf', { 
                  required: 'CPF é obrigatório',
                  pattern: {
                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                    message: 'CPF inválido'
                  }
                })}
                label="CPF"
                fullWidth
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('cnhCategory')}
                select
                label="Categoria CNH"
                fullWidth
              >
                {cnhCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('cnhNumber')}
                label="Número CNH"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('cnhExpiration')}
                label="Vencimento CNH"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
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

export default DriverForm;