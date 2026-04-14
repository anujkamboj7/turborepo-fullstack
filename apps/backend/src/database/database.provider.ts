import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from './database.constants';
import * as authSchema from '../auth/schema';

export const databaseProvider = {
  provide: DRIZZLE,
  useFactory: (configuration: ConfigService) => {
    const pool = new Pool({
      connectionString: configuration.getOrThrow<string>('DATABASE_URL'),
    });

    return drizzle(pool, {
      schema: {
        ...authSchema,
      },
    });
  },
  inject: [ConfigService],
};
