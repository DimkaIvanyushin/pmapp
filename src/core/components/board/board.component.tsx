import React from 'react';
import { Card, Empty } from '..';
import { Issue } from '../../models';
import cardsImage from '../../../assets/images/cards.svg';
import './board.component.scss';

type BoardProps = {
  issues: Issue[];
  title: string;
  type?: 'debug' | 'success';
};

export function Board({ issues, title, type }: BoardProps) {
  const issuesCard = issues.map((issue) => (
    <Card
      key={issue.id}
      text={issue.title}
      avatarSrc={issue.assignee?.avatar_url}
      id={issue.iid}
      type={type}
    />
  ));
  return (
    <div className='board'>
      <div className='title'>
        <span>{title}</span>
        <span>
          <img src={cardsImage} alt='cards' />
          {issues.length}
        </span>
      </div>
      {issuesCard.length ? issuesCard : <Empty />}
    </div>
  );
}
