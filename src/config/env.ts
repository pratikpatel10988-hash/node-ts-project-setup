import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().default('1d'),
});

const parseEnv = envSchema.safeParse(process.env);

if (!parseEnv.success) {
  console.error('❌ Invalid environment variables', parseEnv.error.format());
  process.exit(1);
}

export const env = parseEnv.data;
