import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {RolesGuard} from "./auth/roles.guard";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet'
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({logger: true})
  );
  await app.register(helmet)
  await app.listen(3000);
  app.useGlobalGuards(new RolesGuard());
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
