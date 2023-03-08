import React, { useState } from 'react';
import { Modal } from '../../dumb/modal/Modal';
import { createPortal } from 'react-dom';
import { Milestone } from '../../dumb/milestone/Milestone';
import { Input } from '../../dumb/input/Input';
import { Label } from '../../dumb/label/Label';

export function MilestoneCreate() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='milestone-create'>
      <div className='milesone-create-button' onClick={() => setShowModal(true)}>
        <Milestone type='create' />
      </div>

      {showModal &&
        createPortal(
          <Modal title={'Создать этап'} onClose={() => setShowModal(false)}>
            <div>
              <Label required>Заголовок</Label>
              <Input placeholder='Заголовок' />
            </div>
          </Modal>,
          document.body,
        )}
    </div>
  );
}
