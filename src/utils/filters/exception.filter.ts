import { Response } from 'express';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

/**
 * Class to handle custom HTTP exceptions
 */
@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  /**
   * Function to catch exceptions
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const status = exception.getStatus();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse();

    const message =
      typeof exceptionResponse === 'object' && exceptionResponse !== null
        ? (exceptionResponse as any).message || 'An error occurred'
        : exceptionResponse;

    response.status(status).json({
      status,
      message,
    });
  }
}
