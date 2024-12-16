export type Pagination = {
	currentPg: number;
	itemsPerPg: number;
	totalItems: number;
	totalPgs: number;
};

export type PaginationResult<T> = {
	items: T;
	pagination: Pagination;
};
