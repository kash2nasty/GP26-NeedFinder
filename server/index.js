import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import eligibilityRoutes from './routes/eligibility.js';
import shareRoutes from './routes/share.js';
import resourcesRoutes from './routes/resources.js';

dotenv.config({ path: '../.env' });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:4173',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'GP 26 NeedFinder API' });
});

app.use('/api/eligibility', eligibilityRoutes);
app.use('/api/share', shareRoutes);
app.use('/api/resources', resourcesRoutes);

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message || 'Something went wrong',
  });
});

app.listen(PORT, () => {
  // Server started
});
