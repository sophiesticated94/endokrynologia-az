/**
 * Helpery porządkowania slotów placementu inline enhancementów w lekcjach.
 */

export const ENHANCEMENT_SLOT_ORDER = [
  'after-intro',
  'after-text',
  'before-checkpoint',
  'checkpoint',
  'after-checkpoint',
  'end-of-block',
] as const;

export type EnhancementSlot = typeof ENHANCEMENT_SLOT_ORDER[number];

export function getSlotRank(placement?: string): number {
  switch (placement) {
    case 'after-intro':
      return 0;
    case 'after-text':
      return 1;
    case 'before-checkpoint':
      return 2;
    case 'checkpoint':
      return 3;
    case 'after-checkpoint':
      return 4;
    case 'end-of-block':
    default:
      return 5;
  }
}

export function compareSlotRanks(placementA?: string, placementB?: string): number {
  return getSlotRank(placementA) - getSlotRank(placementB);
}
