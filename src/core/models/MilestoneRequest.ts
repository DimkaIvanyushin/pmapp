export interface MilestoneRequest {
  id: number;
  title?: string;
  description?: string;
  /** Формат даты (YYYYMMDD) */
  due_date?: string;
  /** Формат даты (YYYYMMDD) */
  start_date?: string;
}

export interface MilestoneEditRequest extends MilestoneRequest {
  milestone_id: number;
  state_event?: string;
}
