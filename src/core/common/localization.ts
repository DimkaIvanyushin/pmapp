import LocalizedStrings from 'react-localization';

export enum Languages {
  RU = 'ru-RU',
  EN = 'en-EN',
}

export const Strings = new LocalizedStrings({
  [Languages.RU]: {
    header: 'Руководитель проекта',
    description: 'Создайте новый этап или просмотри существующий',
  },
  [Languages.EN]: {
    header: 'Project Manager',
    description: 'Project of a new stage or review',
  },
});
