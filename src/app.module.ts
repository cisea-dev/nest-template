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

@Module({
  imports: [
      UsersModule,
      AuthModule,
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
      }),
  ],
  controllers: [
      AppController,
      UsersController
  ],
  providers: [AppService],
})
export class AppModule {}
