import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFormatMiddleware } from './middlewares/response.format-middleware';
import { AllExceptionsFilter } from './middlewares/exception-middleware';
import { LoggingInterceptor } from './middlewares/logging/logging.interceptor';
import { LogRequestsService } from './log_requests/log_requests.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new ResponseFormatMiddleware().use);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({
    //origin: 'http://localhost.com', // Permitir apenas esse domínio
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type, Authorization', // Cabeçalhos permitidos
  });
  const logService = app.get(LogRequestsService);
  app.useGlobalInterceptors(new LoggingInterceptor(logService));

  await app.listen(3000);
}
bootstrap();
