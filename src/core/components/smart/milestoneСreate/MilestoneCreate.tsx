import React, { useState } from 'react';
import { Modal } from '../../dumb/modal/Modal';
import { createPortal } from 'react-dom';
import { Label } from '../../dumb/label/Label';
import { TextArea } from '../../dumb/input/TextArea';
import { FormGroup } from '../../dumb/forms/FormGroup';
import { DatePicker } from '../../dumb/input/DatePicker';
import { Row } from '../../dumb/layout/Row';
import { CreateMilestone } from '../../dumb/milestone/CreateMilestone';
import './MilestoneCreate.scss';

export function MilestoneCreate() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='milestone-create'>
      <div className='milesone-create-button' onClick={() => setShowModal(true)}>
        <CreateMilestone />
      </div>

      {showModal &&
        createPortal(
          <Modal title={'Создать этап'} onClose={() => setShowModal(false)}>
            <form>
              <FormGroup>
                <Label required>Заголовок</Label>
                <TextArea name='title' rows={3} />
              </FormGroup>
              <FormGroup>
                <Label required>Описание</Label>
                <TextArea name='description' rows={5} />
              </FormGroup>
              <Row>
                <FormGroup>
                  <Label>Начало</Label>
                  <DatePicker name='start' />
                </FormGroup>
                <FormGroup>
                  <Label>Окончание</Label>
                  <DatePicker name='end' />
                </FormGroup>
              </Row>
            </form>
          </Modal>,
          document.body,
        )}
    </div>
  );
}
