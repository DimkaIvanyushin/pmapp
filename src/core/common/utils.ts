import { Languages } from './localization';

export function getLocalDateString(date: string): string {
  return new Date(date).toLocaleDateString();
}

export function getPercent(a: number, b: number): number {
  return Math.round((a / b || 0) * 100);
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getBusinessDaysCount(
  startDate: Date | string,
  endDate: Date | string,
): number | null {
  if (!startDate || !endDate) {
    return null;
  }

  if (typeof startDate === 'string') {
    startDate = new Date(startDate);
  }

  if (typeof endDate === 'string') {
    endDate = new Date(endDate);
  }

  // Количество рабочих дней
  let businessDays = 0;

  // Итерируемся по дням между датами
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    // Если день недели не суббота и не воскресенье, увеличиваем счетчик рабочих дней
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      businessDays++;
    }
  }

  // Возвращаем количество рабочих дней
  return businessDays;
}

export function getLang(): Languages {
  if (navigator.languages != undefined) return navigator.languages[0] as Languages;
  return navigator.language as Languages;
}

export function timeSince(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' лет';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' месяцев';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' дней';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' часов';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' минут';
  }
  return Math.floor(seconds) + ' секунд';
}
