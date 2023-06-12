import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {RolesGuard} from "./auth/roles.guard";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  app.useGlobalGuards(new RolesGuard());
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
