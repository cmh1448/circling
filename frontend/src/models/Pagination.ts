export class Pageable {
  constructor(
    public pageNumber: number,
    public pageSize: number,
    public offset: number
  ) {}

  public static of(size: number, page: number) {
    return new Pageable(page, size, 0);
  }

  public toQueryString(includeQuestionMark: boolean = false) {
    return `${includeQuestionMark ? "?" : ""}page=${this.pageNumber}&size=${
      this.pageSize
    }`;
  }
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
