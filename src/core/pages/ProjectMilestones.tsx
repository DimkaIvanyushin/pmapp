import * as React from 'react'
import './ProjectMilestones.scss'
import { Milestones } from '../components/smart/milestones/Milestones'
import image from '../../assets/images/bg.svg'

const PROJECT_ID = 261; //180

export const ProjectMilestones = () => {
  return (
    <div className='project-contents' style={{ backgroundImage: `url(${image})` }}>
      <h1>Руководитель проекта</h1>
      <p>Создайте новый этап или просмотри существующий</p>
      <Milestones projectId={PROJECT_ID}/>
    </div>
  )
}
