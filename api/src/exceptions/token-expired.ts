import { BaseException } from '@smartnews/directus-exceptions';

export class TokenExpiredException extends BaseException {
	constructor(message = 'Token expired.') {
		super(message, 401, 'TOKEN_EXPIRED');
	}
}
