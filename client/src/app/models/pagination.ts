export type Pagination = {
	currentPg: number;
	itemsPerPg: number;
	totalItems: number;
	totalPgs: number;
};

export class PaginationResult<T> {
	items?: T;
	pagination?: Pagination;
}
