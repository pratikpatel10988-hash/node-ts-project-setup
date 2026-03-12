import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';

import { errorHandler } from './middlewares/errorHandler.middleware';
import { env } from './config/env';
import routes from './routes';
import { setupSwagger } from './docs/swagger';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running properly' });
});

app.use('/api/v1', routes);
setupSwagger(app);
app.use(errorHandler);

export default app;
