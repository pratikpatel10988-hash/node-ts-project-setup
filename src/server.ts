import app from './app';
import { env } from './config/env';
import { prisma } from './config/db';

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('📦 Connected to PostgreSQL database');

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
