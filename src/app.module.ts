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
<<<<<<< HEAD
import {RouterModule} from "@nestjs/core";
=======
import { CaslModule } from './casl/casl.module';

>>>>>>> 9d5a5e95fab2128f681f6690d5d8627bfb0aa333
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
  providers: [AppService],
})
export class AppModule {}
