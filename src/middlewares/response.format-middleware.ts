import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseFormatMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const oldJson = res.json;

    res.json = (body) => {
      const statusCode = res.statusCode;
      const responseFormat = {
        statusCode,
        success: statusCode >= 200 && statusCode < 300,
        data: body,
        message: 'Operation completed successfully',
        error: null,
      };

      if (body instanceof HttpException) {
        const status = body.getStatus();
        const response = body.getResponse();
        responseFormat.statusCode = status;
        responseFormat.success = false;
        responseFormat.data = null;
        responseFormat.message = typeof response === 'string' ? response : response['message'];
        responseFormat.error = response;

        res.status(status);
      }

      return oldJson.call(res, responseFormat);
    };

    next();
  }
}
