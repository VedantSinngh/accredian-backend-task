import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import referralRoutes from './routes/referralRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import logger from './config/logger.js';

dotenv.config();

// Validate environment variables
if (!process.env.DATABASE_URL || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  logger.error('Missing required environment variables');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/referrals', referralRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
});