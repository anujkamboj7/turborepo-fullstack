import { registerAs } from '@nestjs/config';

export const DATABASE_CONFIG = registerAs('DATABASE', () => {
  return {
    URL: process.env['DATABASE_URL'],
  };
});
