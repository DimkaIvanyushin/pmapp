import { Issue, Milestone } from '../../../../models';

export type MilestoneProps = {
  projectId: number;
  milestone: Milestone;
  editHandler: (milestone: Milestone) => void;
};

export type MilestoneHeaderProps = {
  issues: MilestoneBodyProps;
  milestone: Milestone;
  isLoading?: boolean;
  editHandler: (milestone: Milestone) => void;
};

export type MilestoneBodyProps = {
  openIssues: Issue[];
  testsIssues: Issue[];
  closedIssues: Issue[];
};

export type IssueState = {
  isVisible: boolean;
  issue?: Issue;
};
