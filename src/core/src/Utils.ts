export function getLocalDateString(date: string): string {
  return new Date(date).toLocaleDateString();
}

export function getPercent(a: number, b: number): number {
  return Math.round((a / b || 0) * 100);
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
