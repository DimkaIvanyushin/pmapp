import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Milestone as MilestoneModel, Pagination } from '../../../../models';
import { MilestonesProps, MilestoneState } from './milestones.types';
import { Button, Modal } from '../../../../components';
import { Strings } from '../../../../common';
import { Milestone, MilestoneCreateForm, CreateMilestoneButton } from '..';
import './milestones.component.scss';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  createMilestoneAsync,
  editMilestoneAsync,
  getMilestonesAsync,
  selectMilestones,
  selectMilestonesStatus,
} from '../../../../store/features/milestones/milestones-slice';

export function Milestones({ projectId }: MilestonesProps) {
  const [pagination, setPagination] = useState<Pagination>({ perPage: 5, page: 1 });

  const dispatch = useAppDispatch();
  const milestonesState = useAppSelector(selectMilestonesStatus);
  const milestones = useAppSelector(selectMilestones(projectId));

  const [milestoneState, setMilestone] = useState<MilestoneState>({
    milestone: null,
    isVisible: false,
  });

  useEffect(() => {
    dispatch(getMilestonesAsync({ projectId, pagination }));
  }, [pagination]);

  async function createOrEditMilestone(milestone: MilestoneModel) {
    milestone.id
      ? dispatch(editMilestoneAsync({ projectId, milestone }))
      : dispatch(createMilestoneAsync({ projectId, milestone }));

    setMilestone({ isVisible: false });
  }

  function onNextPage() {
    const { page, perPage } = pagination;
    setPagination({ page: page + 1, perPage });
  }

  function editButtonHandler(milestone: MilestoneModel) {
    setMilestone({ isVisible: true, milestone });
  }

  function showModalMIlestone() {
    setMilestone({ isVisible: true });
  }

  function hideModalMIlestone() {
    setMilestone({ isVisible: false });
  }

  return (
    <div className='milestones'>
      <CreateMilestoneButton onClick={showModalMIlestone} />
      {milestones.map((milestone) => (
        <Milestone
          key={milestone.id}
          milestone={milestone}
          projectId={projectId}
          editHandler={editButtonHandler}
        />
      ))}

      <div className='milestones-next-button'>
        <Button onClick={onNextPage}>{Strings.showMore}</Button>
      </div>

      {milestoneState.isVisible &&
        createPortal(
          <Modal
            title={milestoneState.milestone ? Strings.editMilestone : Strings.createMilestone}
            onClose={hideModalMIlestone}
            footer={false}
          >
            <MilestoneCreateForm
              milestone={milestoneState?.milestone}
              onCancel={hideModalMIlestone}
              onOk={createOrEditMilestone}
            />
          </Modal>,
          document.body,
        )}
    </div>
  );
}
