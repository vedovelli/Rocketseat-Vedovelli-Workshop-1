export function createId(): string {
  return Math.random().toString(36).slice(2);
}
