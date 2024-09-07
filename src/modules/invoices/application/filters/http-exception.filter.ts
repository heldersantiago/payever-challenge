import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const httpResponse = ctx.getResponse();
    const httpRequest = ctx.getRequest();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception.getResponse();
    const message =
      (exceptionResponse as any).message || 'Internal server error';

    httpResponse.status(status).json({
      timestamp: new Date().toISOString(),
      path: httpRequest.url,
      message: message,
    });
  }
}
