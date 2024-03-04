import { defineOperationApi } from '@smartnews/directus-utils';

type Options = {
	code: string;
};

export default defineOperationApi<Options>({
	id: 'exec',
	handler: async () => {
		throw new Error('permission denied');
	},
});
