import { defineInterface } from '@smartnews/directus-utils';
import InterfaceSystemToken from './system-token.vue';

export default defineInterface({
	id: 'system-token',
	name: '$t:interfaces.system-token.system-token',
	description: '$t:interfaces.system-token.description',
	icon: 'vpn_key',
	component: InterfaceSystemToken,
	system: true,
	types: ['hash'],
	options: [],
});
