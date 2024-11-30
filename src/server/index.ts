import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/routes';
import { databaseService } from './services/DatabaseService';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', async (_req, res) => {
  try {
    const isHealthy = await databaseService.healthCheck();
    res.json({ status: isHealthy ? 'healthy' : 'unhealthy' });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ 
      status: 'unhealthy', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Routes
app.use('/api/routes', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;