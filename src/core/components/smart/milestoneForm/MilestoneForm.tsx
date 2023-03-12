import React, { useState } from 'react';
import { Milestone } from '../../../models/Milestone';
import { Button } from '../../dumb/button/Button';
import { FormGroup } from '../../dumb/forms/FormGroup';
import { DatePicker } from '../../dumb/input/DatePicker';
import { Input } from '../../dumb/input/Input';
import { TextArea } from '../../dumb/input/TextArea';
import { Label } from '../../dumb/label/Label';
import { Row } from '../../dumb/layout/Row';
import './MilestoneForm.scss';

type MilestoneCreateFormProps = {
  milestone?: Milestone | null;
  onOk: (milestone: Milestone) => Promise<void>;
  onCancel: () => void;
};

export function MilestoneCreateForm({ milestone, onOk, onCancel }: MilestoneCreateFormProps) {
  const [milestoneState, setMilestoneState] = useState<Partial<Milestone>>(milestone || {});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleInputChange(target: HTMLInputElement | HTMLTextAreaElement) {
    const name = target.name;
    const value = target.value;
    if (name) {
      setMilestoneState({ ...milestoneState, [name]: value });
    }
  }

  async function handlerSaveButton(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    try {
      event.preventDefault();
      setIsLoading(true);
      await onOk(milestoneState as Milestone);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function isDisabled(): boolean {
    return !milestoneState.title?.length;
  }

  return (
    <form>
      <FormGroup>
        <Label required>Заголовок</Label>
        <Input
          required
          name='title'
          value={milestoneState?.title}
          onChange={(event) => handleInputChange(event.target)}
          autofocus={true}
        />
      </FormGroup>
      <FormGroup>
        <Label>Описание</Label>
        <TextArea
          name='description'
          value={milestoneState?.description}
          rows={5}
          onChange={(event) => handleInputChange(event.target)}
        />
      </FormGroup>
      <Row>
        <FormGroup>
          <Label>Начало</Label>
          <DatePicker
            name='start_date'
            onChange={(event) => handleInputChange(event.target)}
            value={milestoneState?.start_date}
          />
        </FormGroup>
        <FormGroup>
          <Label>Окончание</Label>
          <DatePicker
            name='due_date'
            onChange={(event) => handleInputChange(event.target)}
            value={milestoneState?.due_date}
          />
        </FormGroup>
      </Row>
      <FormGroup>
        <div className='actions'>
          <Button onClick={onCancel}>Отмена</Button>
          <Button
            type='primary'
            onClick={(event) => handlerSaveButton(event)}
            loading={isLoading}
            disabled={isDisabled()}
          >
            Сохранить
          </Button>
        </div>
      </FormGroup>
    </form>
  );
}
