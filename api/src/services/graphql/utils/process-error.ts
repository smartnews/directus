import { BaseException } from '@smartnews/directus-exceptions';
import type { Accountability } from '@smartnews/directus-types';
import type { GraphQLError, GraphQLFormattedError } from 'graphql';
import logger from '../../../logger.js';

const processError = (accountability: Accountability | null, error: Readonly<GraphQLError>): GraphQLFormattedError => {
	logger.error(error);

	const { originalError } = error;

	if (originalError instanceof BaseException) {
		return {
			message: originalError.message,
			extensions: {
				code: originalError.code,
				...originalError.extensions,
			},
		};
	} else {
		if (accountability?.admin === true) {
			const graphqlFormattedError: {
				-readonly [key in keyof GraphQLFormattedError]: GraphQLFormattedError[key];
			} = {
				message: error.message,
				extensions: {
					code: 'INTERNAL_SERVER_ERROR',
				},
			};

			if (error.locations) {
				graphqlFormattedError.locations = error.locations;
			}

			if (error.path) {
				graphqlFormattedError.path = error.path;
			}

			return graphqlFormattedError;
		} else {
			return {
				message: 'An unexpected error occurred.',
				extensions: {
					code: 'INTERNAL_SERVER_ERROR',
				},
			};
		}
	}
};

export default processError;
