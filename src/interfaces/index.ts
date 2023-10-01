export interface ParentNode {
	translation?: Translation[];
	childrens?: ChildrenParent[];
	expanded: boolean;
	created_at: null;
	id: number;
	parent: null;
	title: string;
	updated_at: null;
}

export interface ChildrenParent {
	created_at: null;
	id: number;
	parent: null;
	title: string;
	updated_at: null;
}

export interface Children {
	children: React.ReactNode;
}

export interface Translation {
	id: number;
	node_id: number;
	locale: string;
	title: string;
	created_at: Date;
	updated_at: Date;
}

export interface Locales {
	locale: string;
	label: string;
}
