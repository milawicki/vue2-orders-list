export interface PaginatedItems<T> extends Pagination {
  items: T[];
}

export interface Pagination {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}
