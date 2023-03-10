import React, { useEffect, useState } from 'react';
// import { Modal } from '../../dumb/modal/Modal';
// import { createPortal } from 'react-dom';
// import { Label } from '../../dumb/label/Label';
// import { TextArea } from '../../dumb/input/TextArea';
// import { FormGroup } from '../../dumb/forms/FormGroup';
// import { DatePicker } from '../../dumb/input/DatePicker';
// import { Row } from '../../dumb/layout/Row';
// import { CreateMilestone } from '../milestone/CreateMilestone';
// import { Milestone } from '../../../models/Milestone';
// import './MilestoneCreate.scss';

// export function MilestoneCreate() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div className='milestone-create'>
//       <div className='milestone-create-button' onClick={() => setShowModal(true)}>
//         <CreateMilestone />
//       </div>

//       {showModal &&
//         createPortal(
//           <Modal title={'Создать этап'} onClose={() => setShowModal(false)}>
//             <MilestoneCreateForm />
//           </Modal>,
//           document.body,
//         )}
//     </div>
//   );
// }

// function MilestoneCreateForm({ milestone }: { milestone?: Milestone }) {
//   return (
//     <form>
//       <FormGroup>
//         <Label required>Заголовок</Label>
//         <TextArea required name='title' rows={3} autofocus={true} defaultValue={milestone?.title} />
//       </FormGroup>
//       <FormGroup>
//         <Label required>Описание</Label>
//         <TextArea name='description' rows={5} defaultValue={milestone?.description} />
//       </FormGroup>
//       <Row>
//         <FormGroup>
//           <Label>Начало</Label>
//           <DatePicker name='start' />
//         </FormGroup>
//         <FormGroup>
//           <Label>Окончание</Label>
//           <DatePicker name='end' />
//         </FormGroup>
//       </Row>
//     </form>
//   );
// }
