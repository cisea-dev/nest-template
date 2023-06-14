import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from "./users/users.controller";
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from "./config/configuration";
import {User} from "./users/entities/user.entity";
import { CaslModule } from './casl/casl.module';
import { RouterModule } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import {APP_GUARD} from '@nestjs/core';
@Module({
  imports: [
      UsersModule,
      AuthModule,
      RouterModule.register([
          {
              path: 'users',
              module: UsersModule,
          },
      ]),
      ConfigModule.forRoot(
          {
              isGlobal: true,
              // load: [configuration],
          }
      ),

      ThrottlerModule.forRoot({
        ttl: 60,
        limit: 10,
      }),
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'be_spada',
          entities: [User],
          autoLoadEntities: true,
          synchronize: true,
          migrations: [/*...*/],
          migrationsTableName: "custom_migration_table",
      }),
    //   CaslModule,
  ],
  controllers: [
      AppController,
      UsersController
  ],
  providers: [AppService,
    {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
    }
],
})
export class AppModule {}
