import { ArgumentsHost, Catch, HttpServer, HttpStatus, LoggerService } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalFilter<T> extends BaseExceptionFilter {
	constructor(private logger: LoggerService, applicationRef?: HttpServer) {
		super(applicationRef);
	}
	catch(exception: T, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		if(exception instanceof QueryFailedError) {
			response.status(HttpStatus.NOT_FOUND).json('Not Found');
		}
		else {
			super.catch(exception, host);
		}


        this.logger.error(exception);
    }
}
