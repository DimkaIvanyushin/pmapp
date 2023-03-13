import React, { useEffect, useState } from 'react';
import { MilestoneBodyProps } from '..';
import { Board, Boards, Button, Input } from '../../../../components';
import { Issue } from '../../../../models';

export function MilestoneBody({
  issues: { closedIssues, openIssues, testsIssues },
  onCreateIssue,
}: {
  issues: MilestoneBodyProps;
  onCreateIssue: () => void;
}) {
  const [issuesState, setIssuesState] = useState<MilestoneBodyProps>({
    closedIssues,
    openIssues,
    testsIssues,
  });

  useEffect(() => {
    setIssuesState({ closedIssues, openIssues, testsIssues });
  }, [closedIssues, openIssues, testsIssues]);

  function onChangeSearch(value: string) {
    function filterIssues(issue: Issue) {
      return (
        String(issue.iid).includes(value) ||
        issue.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    }
    if (!value.length) {
      return setIssuesState({ closedIssues, openIssues, testsIssues });
    }
    return setIssuesState({
      closedIssues: closedIssues.filter(filterIssues),
      openIssues: openIssues.filter(filterIssues),
      testsIssues: testsIssues.filter(filterIssues),
    });
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
        <Board title='Открытые' issues={issuesState.openIssues} />
        <Board title='Тестирование' type={'debug'} issues={issuesState.testsIssues} />
        <Board title='Выполненные' type={'success'} issues={issuesState.closedIssues} />
      </Boards>
    </div>
  );
}
