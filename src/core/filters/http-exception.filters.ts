import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    // const message = exception.getResponse();

    response.status(status).json({
      message:
        exception.message instanceof Object
          ? exception.message.error
          : exception.message,
      statusCode: status,
      path: request.url,
      method: request.method,
    });
  }
}
