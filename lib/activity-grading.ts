import type { LearningActivity } from './course-types.ts';

export type ActivityResponse = number | number[] | string | Record<string, string>;

export function gradeActivity(activity: LearningActivity, response: ActivityResponse): boolean | null {
  if (activity.type === 'recall') return null;
  if (activity.type === 'single_choice' || activity.type === 'lab' || activity.type === 'trend' || activity.type === 'missing_information') {
    return response === activity.answer;
  }
  if (activity.type === 'multi_select') {
    if (!Array.isArray(response)) return false;
    return [...response].sort().join(',') === [...activity.answers].sort().join(',');
  }
  if (activity.type === 'ordering') {
    if (!Array.isArray(response)) return false;
    return response.join(',') === activity.correctOrder.join(',');
  }
  if (activity.type === 'numeric') {
    const parsed = typeof response === 'number' ? response : Number(response);
    return Number.isFinite(parsed) && Math.abs(parsed - activity.answer) <= activity.tolerance;
  }
  if (activity.type === 'matching') {
    if (!response || Array.isArray(response) || typeof response !== 'object') return false;
    return activity.pairs.every(([left, right]) => response[left] === right);
  }
  return false;
}
