import { Router } from 'express';
import { RouteRepository } from '../repositories/RouteRepository';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const routes = await RouteRepository.findAll();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch routes' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const route = await RouteRepository.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch route' });
  }
});

router.post('/', async (req, res) => {
  try {
    const route = await RouteRepository.create(req.body);
    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create route' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const route = await RouteRepository.update(req.params.id, req.body);
    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update route' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const success = await RouteRepository.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Route not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete route' });
  }
});

export default router;