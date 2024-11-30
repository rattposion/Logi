import React from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRoute } from '@/services/api';
import { Route } from '@/types';
import { useToast } from '@/hooks/useToast';

interface CreateRouteFormProps {
  open: boolean;
  onClose: () => void;
}

const states = ['MT', 'GO', 'DF', 'MG'];
const routeTypes = ['GO X GO', 'GO X DF', 'GO X MG', 'GO X MT', 'MT X MT', 'MT X GO', 'MT X DF', 'MT X MG'];

const CreateRouteForm: React.FC<CreateRouteFormProps> = ({ open, onClose }) => {
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<Partial<Route>>();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const originState = watch('originState');
  const destinationState = watch('destinationState');

  const { mutate } = useMutation(createRoute, {
    onSuccess: () => {
      queryClient.invalidateQueries(['routes']);
      showToast('Rota criada com sucesso!', 'success');
      onClose();
    },
    onError: () => {
      showToast('Erro ao criar rota', 'error');
    }
  });

  const generateRouteId = () => {
    const nextId = Math.floor(Math.random() * 1000);
    return `000.${nextId}`;
  };

  const handleRouteTypeChange = (event: SelectChangeEvent<string>) => {
    const [origin, dest] = event.target.value.split(' X ');
    setValue('originState', origin);
    setValue('destinationState', dest);
  };

  const onSubmit = (data: Partial<Route>) => {
    const routeData = {
      ...data,
      id: generateRouteId(),
    };
    mutate(routeData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nova Rota</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Nome da rota é obrigatório' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nome da Rota"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Rota</InputLabel>
                <Select
                  label="Tipo de Rota"
                  value={originState && destinationState ? `${originState} X ${destinationState}` : ''}
                  onChange={handleRouteTypeChange}
                >
                  {routeTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="originState"
                control={control}
                rules={{ required: 'Estado de origem é obrigatório' }}
                render={({ field }) => (
                  <TextField
                    {...field}
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
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="destinationState"
                control={control}
                rules={{ required: 'Estado de destino é obrigatório' }}
                render={({ field }) => (
                  <TextField
                    {...field}
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
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Criar Rota
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateRouteForm;