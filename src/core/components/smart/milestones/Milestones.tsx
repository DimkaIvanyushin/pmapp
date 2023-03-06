import React, { useEffect, useState } from 'react';
import './Milestones.scss';
import { Milestone } from '../../dumb/milestone/Milestone';
import * as Model from '../../../models/Milestone';
import { getMilestones } from '../../../api/Api';

type MilestonesState = {
  loading: boolean;
  milestones: Model.Milestone[];
};

export const Milestones = () => {
  const [milestonesState, setMilestones] = useState<MilestonesState>({
    loading: false,
    milestones: [],
  });

  useEffect(() => {
    return () => {
      setMilestones({ ...milestonesState, loading: true });
      getMilestones(1).then(({ data }) => {
        setMilestones({ loading: false, milestones: data });
      });
    };
  }, []);

  if (!milestonesState || milestonesState.milestones.length === 0) return <p>Нет данных.</p>;

  return (
    <div className='milestones'>
      <Milestone type='create' />

      {milestonesState.milestones.map((milestone) => (
        <Milestone key={milestone.id} milestone={milestone} />
      ))}
    </div>
  );
};
