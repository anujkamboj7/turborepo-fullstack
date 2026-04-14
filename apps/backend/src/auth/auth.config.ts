import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DatabaseModule } from '../database/database.module';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';
import { DRIZZLE } from '../database/database.constants';

/** Same parsing as `main.ts` CORS so Better Auth and `enableCors` stay aligned. */
function trustedOriginsFromEnv(): string[] {
  return (process.env['UI_URL'] ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function authBaseUrl(): string {
  return (
    process.env['BETTER_AUTH_URL'] ??
    `http://localhost:${process.env['PORT'] ?? '3001'}`
  );
}

export const authConfig = {
  imports: [DatabaseModule],
  inject: [DRIZZLE],
  useFactory: (database: NodePgDatabase) => ({
    auth: betterAuth({
      baseURL: authBaseUrl(),
      secret: process.env['BETTER_AUTH_SECRET'],
      database: drizzleAdapter(database, {
        provider: 'pg',
      }),
      emailAndPassword: {
        enabled: true,
      },
      trustedOrigins: trustedOriginsFromEnv(),
    }),
  }),
};
