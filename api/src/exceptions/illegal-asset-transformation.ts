import { BaseException } from '@smartnews/directus-exceptions';

export class IllegalAssetTransformation extends BaseException {
	constructor(message: string) {
		super(message, 400, 'ILLEGAL_ASSET_TRANSFORMATION');
	}
}
