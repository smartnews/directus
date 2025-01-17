import { BaseException } from '@smartnews/directus-exceptions';

export class InvalidCredentialsException extends BaseException {
	constructor(message = 'Invalid user credentials.') {
		super(message, 401, 'INVALID_CREDENTIALS');
	}
}
