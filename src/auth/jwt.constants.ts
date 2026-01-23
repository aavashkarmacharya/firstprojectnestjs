import { configDotenv } from 'dotenv';

configDotenv();
export const jwtconstants = {
  secret: process.env.JWT_SECRET || 'fallback-secret-key',
  expiresIn: 24 * 60 * 60,
  refreshExpiresIn: 7 * 24 * 60 * 60,
};
