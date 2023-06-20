import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from "./auth/roles.guard";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import { join } from 'path';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import fastifyCsrf from '@fastify/csrf-protection';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );
  app.enableCors();
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '..', 'views'),
  });

  await app.register(fastifyCsrf);
  await app.register(helmet);
  await app.listen(3000);
  app.useGlobalGuards(new RolesGuard());
  app.useGlobalGuards(new JwtAuthGuard());
  app.useGlobalPipes(new ValidationPipe());
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
