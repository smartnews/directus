import type { Driver } from '@smartnews/directus-storage';

export const _aliasMap: Record<string, string> = {
	local: '@smartnews/directus-storage-driver-local',
	s3: '@smartnews/directus-storage-driver-s3',
	gcs: '@smartnews/directus-storage-driver-gcs',
	azure: '@smartnews/directus-storage-driver-azure',
	cloudinary: '@smartnews/directus-storage-driver-cloudinary',
};

export const getStorageDriver = async (driverName: string): Promise<typeof Driver> => {
	if (driverName in _aliasMap) {
		driverName = _aliasMap[driverName]!;
	} else {
		throw new Error(`Driver "${driverName}" doesn't exist.`);
	}

	return (await import(driverName)).default;
};
