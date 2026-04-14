import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from '../config';
import { databaseProvider } from './database.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: configurations,
    }),
  ],
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
