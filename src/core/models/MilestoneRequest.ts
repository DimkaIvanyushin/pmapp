export interface MilestoneRequest {
  id: number;
  milestone_id: number;
  title?: string;
  description?: string;
  /** Формат даты (YYYYMMDD) */
  due_date?: string;
  /** Формат даты (YYYYMMDD) */
  start_date?: string;
  state_event?: string;
}
