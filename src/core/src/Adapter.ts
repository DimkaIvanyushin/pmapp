import { Milestone } from '../models/Milestone';
import { MilestoneEditRequest } from '../models/MilestoneRequest';

export function MilestoneToMilestoneEditRequest(
  projectId: number,
  milestone: Milestone,
): MilestoneEditRequest {
  return {
    id: milestone.id,
    milestone_id: milestone.id,
    title: milestone.title,
    description: milestone?.description,
    due_date: milestone?.due_date,
    start_date: milestone?.start_date,
  };
}