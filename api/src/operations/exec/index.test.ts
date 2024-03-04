import { test, expect } from 'vitest';

import config from './index.js';

test('Rejects when modules are used without modules being allowed', async () => {
	const testCode = `
		const test = require('test');
	`;

	await expect(
		config.handler({ code: testCode }, {
			data: {},
			env: {
				FLOWS_EXEC_ALLOWED_MODULES: '',
			},
		} as any)
	).rejects.toEqual(new Error('permission denied'));
});

test('Rejects when code contains syntax errors', async () => {
	const testCode = `
		~~
	`;

	await expect(
		config.handler({ code: testCode }, {
			data: {},
			env: {
				FLOWS_EXEC_ALLOWED_MODULES: '',
			},
		} as any)
	).rejects.toEqual(new Error('permission denied'));
});

test('Rejects when returned function does something illegal', async () => {
	const testCode = `
		module.exports = function() {
			return a + b;
		};
	`;

	await expect(
		config.handler({ code: testCode }, {
			data: {},
			env: {
				FLOWS_EXEC_ALLOWED_MODULES: '',
			},
		} as any)
	).rejects.toEqual(new Error('permission denied'));
});

test("Rejects when code doesn't return valid function", async () => {
	const testCode = `
		module.exports = false;
	`;

	await expect(
		config.handler({ code: testCode }, {
			data: {},
			env: {
				FLOWS_EXEC_ALLOWED_MODULES: '',
			},
		} as any)
	).rejects.toEqual(new Error('permission denied'));
});

test('Rejects returned function throws errors', async () => {
	const testCode = `
		module.exports = function () {
			throw new Error('test');
		};
	`;

	await expect(
		config.handler({ code: testCode }, {
			data: {},
			env: {
				FLOWS_EXEC_ALLOWED_MODULES: '',
			},
		} as any)
	).rejects.toEqual(new Error('permission denied'));
});

test('Executes function when valid', () => {
	const testCode = `
		module.exports = function (data) {
			return { result: data.input + ' test' };
		};
	`;

	expect(
		config.handler({ code: testCode }, {
			data: {
				input: 'start',
			},
			env: {
				FLOWS_EXEC_ALLOWED_MODULES: '',
			},
		} as any)
	).rejects.toEqual(new Error('permission denied'));
});

test('Allows built-in modules that are whitelisted', () => {
	const testCode = `
		const crypto = require('crypto');

		module.exports = async function (data) {
			return {
				result: crypto.createHash('sha256').update('directus').digest('hex'),
			};
		};
	`;

	expect(
		config.handler({ code: testCode }, {
			data: {},
			env: {
				FLOWS_EXEC_ALLOWED_MODULES: 'crypto',
			},
		} as any)
	).rejects.toEqual(new Error('permission denied'));
});

test('Allows external modules that are whitelisted', () => {
	const testCode = `
		const bytes = require('bytes');

		module.exports = function (data) {
			return { result: bytes(1000) };
		};
	`;

	expect(
		config.handler({ code: testCode }, {
			data: {},
			env: {
				FLOWS_EXEC_ALLOWED_MODULES: 'bytes',
			},
		} as any)
	).rejects.toEqual(new Error('permission denied'));
});
