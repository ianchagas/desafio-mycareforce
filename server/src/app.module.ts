import { DadosModule } from '@app/dados';
import { LoginModule } from '@app/login';
import { RedisModule } from '@app/redis';
import { SharedModule } from '@app/shared';
import { AdminMiddleware } from '@app/shared/middleware/admin.middleware';
import { UsuariosMiddleware } from '@app/shared/middleware/login.middleware';
import { UsuariosModule } from '@app/usuarios';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { getMetadataArgsStorage } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    UsuariosModule,
    RedisModule,
    LoginModule,
    DadosModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .exclude(
        { path: 'login', method: RequestMethod.POST },
        { path: 'login/refresh', method: RequestMethod.POST },
        { path: 'logout', method: RequestMethod.POST },
        { path: 'usuarios', method: RequestMethod.POST },
        {
          path: 'dados/profissional',
          method: RequestMethod.GET,
        },
        {
          path: 'dados/gestor',
          method: RequestMethod.GET,
        },
        {
          path: 'usuarios/email/:email',
          method: RequestMethod.GET,
        },
      )
      .forRoutes('*');

    consumer.apply(UsuariosMiddleware).forRoutes(
      {
        path: 'dados/profissional',
        method: RequestMethod.GET,
      },
      {
        path: 'dados/gestor',
        method: RequestMethod.GET,
      },
    );
  }
}
