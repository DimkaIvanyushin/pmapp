import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Milestone } from '../milestone/Milestone';
import * as Model from '../../../models/Milestone';
import { getMilestones } from '../../../api/Api';
import { Modal } from '../../dumb/modal/Modal';
import { MilestoneCreateForm } from '../milestoneForm/MilestoneForm';
import { CreateMilestone } from '../milestone/CreateMilestone';
import * as API from '../../../api/Api';
import { Button } from '../../dumb/button/Button';
import { Pagination } from '../../../models/Pagination';
import './Milestones.scss';
import { MilestonesProps, MilestonesState, MilestoneState } from './MilestonesTypes';

export function Milestones({ projectId }: MilestonesProps) {
  const [pagination, setPagination] = useState<Pagination>({ perPage: 5, page: 1 });

  const [milestonesState, setMilestonesState] = useState<MilestonesState>({
    loading: false,
    milestones: [],
  });

  const [milestoneState, setMilestone] = useState<MilestoneState>({
    milestone: null,
    isVisible: false,
  });

  useEffect(() => {
    setMilestonesState({ ...milestonesState, loading: true });
    getMilestones(projectId, pagination).then(({ data: milestones }) => {
      setMilestonesState({
        loading: false,
        milestones: [...milestonesState.milestones, ...milestones],
      });
    });
  }, [pagination]);

  function editButtonHandler(milestone: Model.Milestone) {
    setMilestone({ isVisible: true, milestone });
  }

  async function editMilestone(projectId: number, milestone: Model.Milestone) {
    await API.editMilestone(projectId, milestone);
    setMilestonesState({
      milestones: milestonesState.milestones.map((_milestone) =>
        _milestone.id === milestone.id ? milestone : _milestone,
      ),
    });
    setMilestone({ isVisible: false });
  }

  async function createMilestone(projectId: number, milestone: Model.Milestone) {
    const responseMilestone = await API.createMilestone(projectId, milestone);
    setMilestonesState({ milestones: [responseMilestone.data, ...milestonesState.milestones] });
    setMilestone({ isVisible: false });
  }

  async function createOrEditMilestone(milestone: Model.Milestone) {
    milestone.id
      ? await editMilestone(projectId, milestone)
      : await createMilestone(projectId, milestone);
  }

  function onNextPage() {
    const { page, perPage } = pagination;
    setPagination({ page: page + 1, perPage });
  }

  function showModalMIlestone() {
    setMilestone({ isVisible: true });
  }

  function hideModalMIlestone() {
    setMilestone({ isVisible: false });
  }

  return (
    <div className='milestones'>
      <CreateMilestone onClick={showModalMIlestone} />
      {milestonesState.milestones.map((milestone) => (
        <Milestone
          key={milestone.id}
          milestone={milestone}
          projectId={projectId}
          editHandler={editButtonHandler}
        />
      ))}

      <div className='milestones-next-button'>
        <Button onClick={onNextPage}>Показать ещё</Button>
      </div>

      {milestoneState.isVisible &&
        createPortal(
          <Modal
            title={milestoneState.milestone ? 'Редактировать этап' : 'Создать этап'}
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
