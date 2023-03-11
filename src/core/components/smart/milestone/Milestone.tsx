import React, { useEffect, useState, useMemo } from 'react';
import { Progress } from '../../dumb/progress/Progress';
import { Avatar } from '../../dumb/avatar/Avatar';
import { AvatarGroup } from '../../dumb/avatarGroup/AvatarGroup';
import * as Model from '../../../models/Milestone';
import { User } from '../../../models/User';
import { Issue } from '../../../models/Issue';
import { Collapse } from '../../dumb/collapse/Collapse';
import { Boards } from '../../dumb/boards/Boards';
import { Board } from '../../dumb/board/Board';
import { getIssues } from '../../../api/Api';
import { getLocalDateString, getPercent } from '../../../src/Utils';
import { DateIcon } from '../../dumb/icons/date/Date';
import { LoadingIcon } from '../../dumb/icons/loading/Loading';
import './Milestone.scss';
import { Button } from '../../dumb/button/Button';

type MilestoneProps = {
  projectId: number;
  milestone: Model.Milestone;
  editHandler: (milestone: Model.Milestone) => void;
};

type MilestoneHeaderProps = {
  issues: MilestoneBodyProps;
  milestone: Model.Milestone;
  isLoading?: boolean;
  editHandler: (milestone: Model.Milestone) => void;
};

type MilestoneBodyProps = {
  openIssues: Issue[];
  testsIssues: Issue[];
  closedIssues: Issue[];
};

export function Milestone({ milestone, projectId, editHandler }: MilestoneProps) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getIssues(projectId, milestone.id)
      .then((response) => setIssues(response.data))
      .finally(() => setIsLoading(false));
  }, [projectId]);

  const issuesProps = useMemo(() => {
    return {
      openIssues: issues.filter((issue) => issue.labels.includes('To Do')),
      testsIssues: issues.filter(
        (issue) => issue.labels.includes('Testing') && issue.state !== 'closed',
      ),
      closedIssues: issues.filter((issue) => issue.state === 'closed'),
    } as MilestoneBodyProps;
  }, [issues]);

  return (
    <Collapse>
      <MilestoneHeader
        issues={issuesProps}
        milestone={milestone}
        editHandler={editHandler}
        isLoading={isLoading}
      />
      <MilestoneBody issues={issuesProps} />
    </Collapse>
  );
}

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

  function editHandlerClick(
    event: React.MouseEvent<HTMLButtonElement>,
    milestone: Model.Milestone,
  ) {
    event.stopPropagation();
    editHandler(milestone);
  }

  return (
    <div className='milestone-header'>
      <div className='milestone-header-first'>
        <span className='title'>{isLoading ? <LoadingIcon /> : milestone?.title}</span>
        <span className='date'>
          <DateLabel date={milestone?.start_date} tooltip='Начало' />
          <DateLabel date={milestone?.due_date} tooltip='Окончание' type='end' />
        </span>
      </div>
      <div className='milestone-header-last'>
        <Button type='primary' onClick={(e) => editHandlerClick(e, milestone)}>
          Редактировать
        </Button>

        <AvatarGroup max={3}>{usersAvatar}</AvatarGroup>
        <Progress percent={percent} extraPercent={extraPercent}>
          <TasksLabel milestone={milestone} close={closedIssues.length} all={allIssues.length} />
        </Progress>
      </div>
    </div>
  );
}

function MilestoneBody({
  issues: { closedIssues, openIssues, testsIssues },
}: {
  issues: MilestoneBodyProps;
}) {
  return (
    <div className='milestone-body'>
      <Boards>
        <Board title='Открытые' issues={openIssues} />
        <Board title='Тестирование' type={'debug'} issues={testsIssues} />
        <Board title='Выполненные' type={'success'} issues={closedIssues} />
      </Boards>
    </div>
  );
}

function TasksLabel({ close, all }: { milestone: Model.Milestone; close: number; all: number }) {
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
  tooltip,
  type,
}: {
  date: string;
  tooltip?: string;
  type?: 'start' | 'end';
}) {
  if (!date) return <span></span>;
  // <Tooltip text={text}>
  return <DateIcon text={getLocalDateString(date)} type={type} />;
}

function getUniqUsers(issues: Issue[]): User[] {
  const usersMap = new Map<number, User>();
  issues.forEach((issue) => usersMap.set(issue.assignee.id, issue.assignee));
  return [...usersMap].map(([, value]) => value);
}
