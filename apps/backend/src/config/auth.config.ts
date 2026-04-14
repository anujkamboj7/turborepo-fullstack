import { registerAs } from '@nestjs/config';

export const AUTH_CONFIG = registerAs('AUTH', () => {
  return {
    UI_URL: process.env['UI_URL'],
  };
});
