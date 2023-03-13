import React, { useMemo } from 'react';
import { MilestoneHeaderProps } from '..';
import { getBusinessDaysCount, getLocalDateString, getPercent } from '../../../../common/index';
import {
  Avatar,
  AvatarGroup,
  Button,
  DateIcon,
  LoadingIcon,
  Progress,
} from '../../../../components';
import { Issue, Milestone, MilestoneState, User } from '../../../../models';
import successIcon from '../../../../../assets/images/success.svg';

export function MilestoneHeader({
  issues: { closedIssues = [], openIssues = [], testsIssues = [] },
  milestone,
  isLoading,
  editHandler,
}: MilestoneHeaderProps) {
  const allIssues = [...closedIssues, ...openIssues, ...testsIssues];
  const percent = getPercent(closedIssues.length, allIssues.length);
  const extraPercent = getPercent(testsIssues.length + closedIssues.length, allIssues.length);
  const assignees = useMemo(() => getUniqUsers(allIssues), [allIssues]);
  const usersAvatar = assignees.map((user) => <Avatar key={user.id} src={user.avatar_url} />);

  function editHandlerClick(event: React.MouseEvent<HTMLButtonElement>, milestone: Milestone) {
    event.stopPropagation();
    editHandler(milestone);
  }

  function isClosedMilestone(): boolean {
    return milestone.state === MilestoneState.CLOSED && !isLoading;
  }

  const leadTime = getBusinessDaysCount(milestone?.start_date, milestone?.due_date);

  return (
    <div className={`milestone-header ${isClosedMilestone() && 'closed'}`}>
      <div className='milestone-header-first'>
        {isClosedMilestone() && <img src={successIcon} alt='success' />}
        <span className='title'>{isLoading ? <LoadingIcon /> : milestone?.title}</span>
        <span className='date'>
          <DateLabel date={milestone?.start_date} tooltip='Начало' />
          <DateLabel date={milestone?.due_date} tooltip='Окончание' type='end' />
          {leadTime && <span>(Дней: {leadTime} )</span>}
        </span>
      </div>
      <div className='milestone-header-last'>
        <div className='slider'>
          <div className='slider-slide'>
            <Button type='primary' onClick={(e) => editHandlerClick(e, milestone)}>
              Редактировать
            </Button>
          </div>
          <div className='slider-slide'>
            <AvatarGroup max={3}>{usersAvatar}</AvatarGroup>
            <Progress percent={percent} extraPercent={extraPercent}>
              <TasksLabel
                milestone={milestone}
                close={closedIssues.length}
                all={allIssues.length}
              />
            </Progress>
          </div>
        </div>
      </div>
    </div>
  );
}

function TasksLabel({ close, all }: { milestone: Milestone; close: number; all: number }) {
  return (
    <div className='tasks-label'>
      <span>
        Задачи:&nbsp;
        <span className='bold'>
          {close}/{all}
        </span>
      </span>
    </div>
  );
}

function DateLabel({
  date,
  type,
}: {
  date: string;
  tooltip?: string;
  type?: 'start' | 'end';
}) {
  if (!date) return <></>;
  return <DateIcon text={getLocalDateString(date)} type={type} />;
}

function getUniqUsers(issues: Issue[]): User[] {
  const usersMap = new Map<number, User>();
  issues.forEach((issue) => issue.assignee?.id && usersMap.set(issue.assignee.id, issue.assignee));
  return [...usersMap].map(([, value]) => value);
}
