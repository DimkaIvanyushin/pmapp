import React, { useEffect, useState, useMemo } from 'react';
import { Progress } from '../../dumb/progress/Progress';
import { Avatar } from '../../dumb/avatar/Avatar';
import { AvatarGroup } from '../../dumb/avatarGroup/AvatarGroup';
import * as Model from '../../../models/Milestone';
import { User } from '../../../models/User';
import { Issue, IssueStateEnum } from '../../../models/Issue';
import { Collapse } from '../../dumb/collapse/Collapse';
import { Boards } from '../../dumb/boards/Boards';
import { Board } from '../../dumb/board/Board';
import { getIssues } from '../../../api/Api';
import { getBusinessDaysCount, getLocalDateString, getPercent } from '../../../src/Utils';
import { DateIcon } from '../../dumb/icons/date/Date';
import { LoadingIcon } from '../../dumb/icons/loading/Loading';
import { Button } from '../../dumb/button/Button';
import { MilestoneState } from '../../../models/Milestone';
import {
  IssueState,
  MilestoneBodyProps,
  MilestoneHeaderProps,
  MilestoneProps,
} from './MilestoneTypes';
import successIcon from '../../../../assets/images/success.svg';
import './Milestone.scss';
import { Input } from '../../dumb/input/Input';
import { createPortal } from 'react-dom';
import { Modal } from '../../dumb/modal/Modal';
import { IssueForm } from '../issueForm/IssueForm';
import * as API from '../../../api/Api';

const INTERVAL_REFRESH_DATA = 300000;

export function Milestone({ milestone, projectId, editHandler }: MilestoneProps) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [issueState, setIssueState] = useState<IssueState>({
    isVisible: false,
  });

  useEffect(() => {
    const intervalId = setInterval(
      () => getIssues(projectId, milestone.id).then((response) => setIssues(response.data)),
      INTERVAL_REFRESH_DATA,
    );
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getIssues(projectId, milestone.id)
      .then((response) => setIssues(response.data))
      .finally(() => setIsLoading(false));
  }, [projectId]);

  const issuesProps = useMemo(() => {
    return {
      openIssues: issues.filter((issue) => issue.state === IssueStateEnum.OPENED),
      testsIssues: issues.filter(
        (issue) => issue.labels.includes('Testing') && issue.state !== IssueStateEnum.CLOSED,
      ),
      closedIssues: issues.filter((issue) => issue.state === IssueStateEnum.CLOSED),
    } as MilestoneBodyProps;
  }, [issues]);

  async function createIssue(issue: Issue) {
    const responseIssue = await API.createIssue(projectId, milestone.id, issue);
    const ni = [responseIssue.data, ...issues];
    console.log(ni);
    setIssues(ni);
    setIssueState({ isVisible: false });
  }

  function showModalIssue() {
    setIssueState({ isVisible: true });
  }

  function hideModalIssue() {
    setIssueState({ isVisible: false });
  }

  return (
    <>
      <Collapse>
        <MilestoneHeader
          issues={issuesProps}
          milestone={milestone}
          editHandler={editHandler}
          isLoading={isLoading}
        />
        <MilestoneBody issues={issuesProps} onCreateIssue={showModalIssue} />
      </Collapse>

      {issueState.isVisible &&
        createPortal(
          <Modal title='Создать задачу' onClose={hideModalIssue} footer={false}>
            <IssueForm issue={null} onOk={createIssue} onCancel={hideModalIssue} />
          </Modal>,
          document.body,
        )}
    </>
  );
}

function MilestoneHeader({
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

function MilestoneBody({
  issues,
  onCreateIssue,
}: {
  issues: MilestoneBodyProps;
  onCreateIssue: () => void;
}) {
  let closedIssues = [...issues.closedIssues];
  let openIssues = [...issues.openIssues];
  let testsIssues = [...issues.testsIssues];

  function onChangeSearch(value: string) {
    function filterIssues(issue: Issue) {
      return (
        String(issue.iid).includes(value) ||
        issue.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    }

    if (!value.length) {
      closedIssues = [...issues.closedIssues];
      openIssues = [...issues.openIssues];
      testsIssues = [...issues.testsIssues];
      return;
    }

    closedIssues = closedIssues.filter(filterIssues);
    openIssues = openIssues.filter(filterIssues);
    testsIssues = testsIssues.filter(filterIssues);
  }

  return (
    <div className='milestone-body'>
      <div className='controls'>
        <Button type='primary' onClick={onCreateIssue}>
          Создать
        </Button>
        <Input
          onChange={(event) => onChangeSearch(event.currentTarget.value)}
          placeholder='Поиск'
        ></Input>
      </div>
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
  if (!date) return <></>;
  // <Tooltip text={text}>
  return <DateIcon text={getLocalDateString(date)} type={type} />;
}

function getUniqUsers(issues: Issue[]): User[] {
  const usersMap = new Map<number, User>();
  issues.forEach((issue) => issue.assignee?.id && usersMap.set(issue.assignee.id, issue.assignee));
  return [...usersMap].map(([, value]) => value);
}
