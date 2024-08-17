import { LoginModule } from '@app/login';
import { RedisModule } from '@app/redis';
import { UsuariosModule } from '@app/usuarios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { getMetadataArgsStorage } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsuariosModule,
    LoginModule,
    RedisModule,
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      migrations: [process.env.TYPEORM_MIGRATIONS],
      keepConnectionAlive: true,
      maxQueryExecutionTime: 5000,
      migrationsRun: true,
      cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
      },
      timezone: 'America/Sao_Paulo',
    } as TypeOrmModuleOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
