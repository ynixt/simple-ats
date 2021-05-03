export interface Page<T> {
  totalPages: number;
  qPage: QPage;
  hasNext: boolean;
  items: Array<T>;
}

export interface QPage {
  page?: number;
  pageSize?: number;
}
