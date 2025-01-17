import { BaseException } from '@smartnews/directus-exceptions';

export class UnsupportedMediaTypeException extends BaseException {
	constructor(message: string, extensions?: Record<string, unknown>) {
		super(message, 415, 'UNSUPPORTED_MEDIA_TYPE', extensions);
	}
}
