import LocalizedStrings from 'react-localization';

export enum Languages {
  RU = 'ru-RU',
  EN = 'en-EN',
}

export const Strings = new LocalizedStrings({
  [Languages.RU]: {
    header: 'Руководитель проекта',
    description: 'Создайте новый этап или просмотри существующий',
    createMilestone: 'Создать этап',
    create: 'Создать',
    editMilestone: 'Редактировать этап',
    edit: 'Редактировать',
    showMore: 'Показать ещё',
    titleLable: 'Заголовок',
    descriptionLabel: 'Описание',
    startLabel: 'Начало',
    endLabel: 'Окончание',
    save: 'Сохранить',
    cancel: 'Отмена',
    search: 'Поиск',
    open: 'Открытые',
    test: 'Тестирование',
    complite: 'Выполненные',
    empty: 'Нет записей',
    issues: 'Задачи',
    days: 'Дней',
    ligth: 'Светлая',
    dark: 'Тёмная',
  },
  [Languages.EN]: {
    header: 'Project Manager',
    description: 'Project of a new stage or review',
    createMilestone: 'Create milestone',
    create: 'Create',
    editMilestone: 'Edit milestone',
    edit: 'Edit',
    showMore: 'Show more',
    titleLable: 'Title',
    descriptionLabel: 'Description',
    startLabel: 'Start',
    endLabel: 'End',
    save: 'Save',
    cancel: 'Cancel',
    search: 'Search',
    open: 'Open',
    test: 'Tests',
    complite: 'Complite',
    empty: 'Empty',
    issues: 'Issues',
    days: 'Days',
    ligth: 'Ligth',
    dark: 'Dark',
  },
});