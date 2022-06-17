export interface GridFilter {
  pageSize: number;
  backend: string;
  filterBy: string;
  sortBy: string;
  sortOrder: number;
  page: number;
  params?: any;
}

export interface GridResult<T> {
  TotalPages: number;
  TotalItems: number;
  Page: number;
  PageSize: number;
  Items: T[];
}

export interface GridCommand<T> {
  data?: T;
  reload?: boolean;
  nextPage?: boolean;
  prevPage?: boolean;
  firstPage?: boolean;
  lastPage?: boolean;
  goToPage?: number;
}
