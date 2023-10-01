export interface GetDataArgs {
	parent?: number;
	locale?: string;
}

export interface SaveDataArgs {
	parent: number;
	locales: string[];
}
