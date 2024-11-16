import dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/./../../../../.env` });

export const {
  DATABASE_URL,
  PORT,
  LOG_LEVEL,
  NODE_ENV,
} = process.env as { [key: string]: string; };
