import React from 'react';
import './Board.scss';
import { Issue } from '../../../models/Issue';
import { Card } from '../card/Card';
import cardsImage from '../../../../assets/images/cards.svg';
import { Empty } from '../empty/Empty';

type BoardProps = {
  issues: Issue[];
  title: string;
  type?: 'debug' | 'success';
};

export function Board({ issues, title, type }: BoardProps) {

  console.log(issues);

  const issuesCard = issues.map((issue) => (
    <Card
      key={issue.id}
      text={issue.title}
      avatarSrc={issue.assignee?.avatar_url}
      id={issue.iid}
      type={type}
    />
  ));

  console.log(issuesCard);
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
