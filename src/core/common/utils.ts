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
