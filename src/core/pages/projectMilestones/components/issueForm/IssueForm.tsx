import React, { useState } from 'react';
import { Button, FormGroup, Label, TextArea } from '../../../../components';
import { Issue } from '../../../../models';


type IssueFormProps = {
  issue?: Issue | null;
  onOk: (issue: Issue) => Promise<void>;
  onCancel: () => void;
};

export function IssueForm({ issue, onCancel, onOk }: IssueFormProps) {
  const [issueState, setIssueState] = useState<Partial<Issue>>(issue || {});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleInputChange(target: HTMLInputElement | HTMLTextAreaElement) {
    const name = target.name;
    const value = target.value;
    if (name) {
      setIssueState({ ...issueState, [name]: value });
    }
  }

  async function handlerSaveButton(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    try {
      event.preventDefault();
      setIsLoading(true);
      await onOk(issueState as Issue);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form>
      <FormGroup>
        <Label required>Заголовок</Label>
        <TextArea
          required
          name='title'
          value={issueState?.title}
          onChange={(event) => handleInputChange(event.target)}
          rows={2}
          autofocus={true}
        />
      </FormGroup>
      <FormGroup>
        <Label>Описание</Label>
        <TextArea
          name='description'
          value={issueState?.description}
          onChange={(event) => handleInputChange(event.target)}
          rows={5}
        />
      </FormGroup>
      <FormGroup>
        <div className='actions'>
          <Button onClick={onCancel}>Отмена</Button>
          <Button type='primary' onClick={(event) => handlerSaveButton(event)} loading={isLoading}>
            Сохранить
          </Button>
        </div>
      </FormGroup>
    </form>
  );
}
