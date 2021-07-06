import { ArgumentsHost, Catch, HttpServer, LoggerService } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class GlobalFilter<T> extends BaseExceptionFilter {
	constructor(private logger: LoggerService, applicationRef?: HttpServer) {
		super(applicationRef);
	}
	catch(exception: T, host: ArgumentsHost) {
        super.catch(exception, host);

        this.logger.error(exception);
    }
}
