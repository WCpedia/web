export interface IItemCount {
  totalItemCount: number;
  todayItemCount: number;
  yesterdayItemCount: number;
}

export interface IPaginationParams {
  take: number;
  firstItemId?: number;
  lastItemId?: number;
  currentPage?: number;
  targetPage?: number;
  status?: boolean;
}
