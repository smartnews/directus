import { defineDisplay } from '@smartnews/directus-utils';
import DisplayFile from './file.vue';

export default defineDisplay({
	id: 'file',
	name: '$t:displays.file.file',
	description: '$t:displays.file.description',
	icon: 'insert_drive_file',
	component: DisplayFile,
	types: ['uuid'],
	localTypes: ['file'],
	options: [],
	fields: ['id', 'type', 'title'],
});
