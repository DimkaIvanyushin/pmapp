import React, { useEffect, useState } from 'react';
import { Milestone } from '../milestone/Milestone';
import * as Model from '../../../models/Milestone';
import { getMilestones } from '../../../api/Api';
import { createPortal } from 'react-dom';
import { Modal } from '../../dumb/modal/Modal';
import { MilestoneCreateForm } from '../milestoneForm/MilestoneForm';
import { CreateMilestone } from '../milestone/CreateMilestone';
import './Milestones.scss';
import * as API from '../../../api/Api';
import { MilestoneToMilestoneEditRequest } from '../../../src/Adapter';
import { delay } from '../../../src/Utils';

type MilestonesProps = {
  projectId: number;
};

type MilestonesState = {
  loading?: boolean;
  milestones: Model.Milestone[];
};

type MilestoneState = {
  isVisible: boolean;
  milestone?: Model.Milestone | null;
};

export function Milestones({ projectId }: MilestonesProps) {
  const [milestonesState, setMilestones] = useState<MilestonesState>({
    loading: false,
    milestones: [],
  });

  const [milestoneState, setMilestone] = useState<MilestoneState>({
    milestone: null,
    isVisible: false,
  });

  useEffect(() => {
    setMilestones({ ...milestonesState, loading: true });
    getMilestones(projectId).then(({ data: milestones }) => {
      setMilestones({ loading: false, milestones });
    });
  }, []);

  function editButtonHandler(milestone: Model.Milestone) {
    setMilestone({ isVisible: true, milestone });
  }

  async function editMilestone(projectId: number, milestone: Model.Milestone) {
    await delay(2000);

    setMilestones({
      milestones: milestonesState.milestones.map((_milestone) =>
        _milestone.id === milestone.id ? milestone : _milestone,
      ),
    });
    setMilestone({ isVisible: false });

    // API.editMilestone(projectId, MilestoneToMilestoneEditRequest(projectId, milestone)).then(
    //   (response) => {
    //     setMilestones({
    //       milestones: milestonesState.milestones.map((_milestone) =>
    //         _milestone.id === milestone.id ? milestone : _milestone,
    //       ),
    //     });
    //     setMilestone({ isVisible: false });
    //   },
    // );
  }

  async function createMilestone(projectId: number, milestone: Model.Milestone) {
    await delay(2000);

    setMilestones({ milestones: [milestone, ...milestonesState.milestones] });
    setMilestone({ isVisible: false });

    // API.createMilestone(projectId, milestone).then((response) => {
    //   setMilestones({ milestones: [milestone, ...milestonesState.milestones] });
    //   setMilestone({ isVisible: false });
    // });
  }

  async function createOrEditMilestone(milestone: Model.Milestone) {
    milestone.id
      ? await editMilestone(projectId, milestone)
      : await createMilestone(projectId, milestone);
  }

  return (
    <div className='milestones'>
      <CreateMilestone onClick={() => setMilestone({ isVisible: true })} />
      {milestonesState.milestones.map((milestone) => (
        <Milestone
          key={milestone.id}
          milestone={milestone}
          projectId={projectId}
          editHandler={editButtonHandler}
        />
      ))}

      {milestoneState.isVisible &&
        createPortal(
          <Modal
            title={milestoneState.milestone ? 'Редактировать этап' : 'Создать этап'}
            onClose={() => setMilestone({ isVisible: false })}
            footer={false}
          >
            <MilestoneCreateForm
              milestone={milestoneState?.milestone}
              onCancel={() => setMilestone({ isVisible: false })}
              onOk={createOrEditMilestone}
            />
          </Modal>,
          document.body,
        )}
    </div>
  );
}
