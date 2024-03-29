import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Issue, IssueStateEnum } from '../../../../models';
import { Collapse, Modal, useMessage } from '../../../../components';
import { MilestoneHeader, MilestoneBody, IssueForm } from '..';
import { IssueState, MilestoneBodyProps, MilestoneProps } from '..';
import { Strings, API } from '../../../../common';
import './milestone.component.scss';

const INTERVAL_REFRESH_DATA = 300000;

export function Milestone({ milestone, projectId, editHandler }: MilestoneProps) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [issueState, setIssueState] = useState<IssueState>({
    isVisible: false,
  });

  const [messageApi, contextMessage] = useMessage();

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

  async function createIssueHandler(issue: Issue) {
    const responseIssue = await API.createIssue(projectId, milestone.id, issue);
    setIssues([responseIssue.data, ...issues]);
    setIssueState({ isVisible: false });
    messageApi.success(Strings.success);
  }

  function showModalIssue() {
    setIssueState({ isVisible: true });
  }

  function hideModalIssue() {
    setIssueState({ isVisible: false });
  }

  return (
    <>
      {contextMessage}

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
          <Modal title={Strings.create} onClose={hideModalIssue} footer={false}>
            <IssueForm issue={null} onOk={createIssueHandler} onCancel={hideModalIssue} />
          </Modal>,
          document.body,
        )}
    </>
  );
}
