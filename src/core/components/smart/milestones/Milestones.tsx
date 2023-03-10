import React, { useEffect, useState } from 'react';
import './Milestones.scss';
import { CreateMilestone, Milestone } from '../milestone/Milestone';
import * as Model from '../../../models/Milestone';
import { getMilestones } from '../../../api/Api';
import { Empty } from '../../dumb/empty/Empty';

type MilestonesProps = {
  projectId: number;
};

type MilestonesState = {
  loading: boolean;
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

  if (!milestonesState || milestonesState.milestones.length === 0)
    return <Empty text='Нет данных' />;

  return (
    <div className='milestones'>
      <CreateMilestone onClick={() => setMilestone({ isVisible: true })} />
      {milestonesState.milestones.map((milestone) => (
        <Milestone key={milestone.id} milestone={milestone} projectId={projectId} />
      ))}
    </div>
  );
}
