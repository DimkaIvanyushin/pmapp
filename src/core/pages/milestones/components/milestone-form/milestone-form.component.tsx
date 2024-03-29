import React, { useState } from 'react';
import { Button, DatePicker, FormGroup, Input, Label, Row, TextArea } from '../../../../components';
import { Milestone } from '../../../../models';
import './milestone-form.component.scss';
import { Strings } from '../../../../common';

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
        <Label required>{Strings.titleLabel}</Label>
        <Input
          required
          name='title'
          value={milestoneState?.title}
          onChange={(event) => handleInputChange(event.target)}
          autofocus={true}
        />
      </FormGroup>
      <FormGroup>
        <Label>{Strings.descriptionLabel}</Label>
        <TextArea
          name='description'
          value={milestoneState?.description}
          rows={5}
          onChange={(event) => handleInputChange(event.target)}
        />
      </FormGroup>
      <Row>
        <FormGroup>
          <Label>{Strings.startLabel}</Label>
          <DatePicker
            name='start_date'
            onChange={(event) => handleInputChange(event.target)}
            value={milestoneState?.start_date}
          />
        </FormGroup>
        <FormGroup>
          <Label>{Strings.endLabel}</Label>
          <DatePicker
            name='due_date'
            onChange={(event) => handleInputChange(event.target)}
            value={milestoneState?.due_date}
          />
        </FormGroup>
      </Row>
      <FormGroup>
        <div className='actions'>
          <Button onClick={onCancel}>{Strings.cancel}</Button>
          <Button
            type='primary'
            onClick={(event) => handlerSaveButton(event)}
            loading={isLoading}
            disabled={isDisabled()}
          >
            {Strings.save}
          </Button>
        </div>
      </FormGroup>
    </form>
  );
}
