// src/utils/error-utils.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorUtils {
  static throwBadRequest(message: string): void {
    throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: message,
    }, HttpStatus.BAD_REQUEST);
  }

  static throwUnauthorized(message: string): void {
    throw new HttpException({
      status: HttpStatus.UNAUTHORIZED,
      error: message,
    }, HttpStatus.UNAUTHORIZED);
  }

  static throwNotFound(message: string): void {
    throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: message,
    }, HttpStatus.NOT_FOUND);
  }

  static throwInternalServerError(message: string): void {
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: message,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
