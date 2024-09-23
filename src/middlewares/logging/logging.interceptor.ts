import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogRequestsService } from 'src/log_requests/log_requests.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogRequestsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, originalUrl, body: requestBody } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(async (responseBody) => {
        const { statusCode } = response;
        const endTime = Date.now();
        const duration = endTime - startTime;

        // Salvar logs no banco de dados via LogRequestsService
        await this.logService.createLog({
          method,
          url: originalUrl,
          status_code:statusCode,
          duration,
          request_body: JSON.stringify(requestBody),
          response_body: JSON.stringify(responseBody),
        });
      }),
    );
  }
}
