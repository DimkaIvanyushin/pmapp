import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Issue, IssueStateEnum } from '../../../../models';
import { Collapse, Modal } from '../../../../components';
import { MilestoneHeader, MilestoneBody, IssueForm } from '..';
import { IssueState, MilestoneBodyProps, MilestoneProps } from '..';
import * as API from '../../../../api/Api';
import './Milestone.scss';

const INTERVAL_REFRESH_DATA = 300000;

export function Milestone({ milestone, projectId, editHandler }: MilestoneProps) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [issueState, setIssueState] = useState<IssueState>({
    isVisible: false,
  });

  useEffect(() => {
    const intervalId = setInterval(
      () => API.getIssues(projectId, milestone.id).then((response) => setIssues(response.data)),
      INTERVAL_REFRESH_DATA,
    );
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    API.getIssues(projectId, milestone.id)
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
    setIssues([responseIssue.data, ...issues]);
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