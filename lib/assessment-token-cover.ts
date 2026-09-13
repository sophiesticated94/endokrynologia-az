import type { LearningActivity } from './course-types.ts';
import { isActivityTransfer, isActivityGeneration } from './assessment-coverage.ts';

export function computeExactMinimalSetCover(
  items: LearningActivity[],
  requiredObjectiveIds: Set<string>
): { isExact: boolean; count: number } {
  if (requiredObjectiveIds.size === 0) return { isExact: true, count: 0 };
  if (items.length === 0) return { isExact: true, count: 0 };

  // If pool size <= 15, do exact search (combinations of increasing size)
  if (items.length <= 15) {
    const n = items.length;
    for (let k = 1; k <= n; k++) {
      const checkCombination = (start: number, chosen: number[]): boolean => {
        if (chosen.length === k) {
          const covered = new Set<string>();
          for (const idx of chosen) {
            for (const id of items[idx].objectiveIds || []) {
              if (requiredObjectiveIds.has(id)) covered.add(id);
            }
          }
          return covered.size === requiredObjectiveIds.size;
        }
        for (let i = start; i < n; i++) {
          chosen.push(i);
          if (checkCombination(i + 1, chosen)) return true;
          chosen.pop();
        }
        return false;
      };
      if (checkCombination(0, [])) {
        return { isExact: true, count: k };
      }
    }
  }

  // Greedy fallback for larger pools (> 15)
  const tempCovered = new Set<string>();
  let minCount = 0;
  const poolCopy = [...items];
  while (tempCovered.size < requiredObjectiveIds.size && poolCopy.length > 0) {
    poolCopy.sort((a, b) => {
      const aNew = (a.objectiveIds || []).filter(id => requiredObjectiveIds.has(id) && !tempCovered.has(id)).length;
      const bNew = (b.objectiveIds || []).filter(id => requiredObjectiveIds.has(id) && !tempCovered.has(id)).length;
      return bNew - aNew;
    });
    const best = poolCopy.shift();
    if (!best) break;
    const added = (best.objectiveIds || []).filter(id => requiredObjectiveIds.has(id) && !tempCovered.has(id));
    if (added.length === 0) break;
    added.forEach(id => tempCovered.add(id));
    minCount++;
  }
  return { isExact: false, count: Math.max(minCount, 1) };
}

export function computeExactMinimalTokenSetCover(
  items: LearningActivity[],
  requiredTokens: Set<string>,
  getTokens: (item: LearningActivity) => Set<string>
): { isExact: boolean; count: number; selectedItems: LearningActivity[] } {
  if (requiredTokens.size === 0) return { isExact: true, count: 0, selectedItems: [] };
  if (items.length === 0) return { isExact: true, count: 0, selectedItems: [] };

  const itemTokens = items.map(it => getTokens(it));

  const coverableTokens = new Set<string>();
  for (const tSet of itemTokens) {
    for (const t of tSet) {
      if (requiredTokens.has(t)) coverableTokens.add(t);
    }
  }

  // Exact search if pool <= 15
  if (items.length <= 15) {
    const n = items.length;
    let bestChosen: number[] | null = null;
    let bestDiversity = -1;

    for (let k = 1; k <= n; k++) {
      let foundCompleteForK = false;

      const evaluateCombination = (chosen: number[]) => {
        const covered = new Set<string>();
        const types = new Set<string>();
        let transferCount = 0;
        let genCount = 0;

        for (const idx of chosen) {
          const it = items[idx];
          types.add(it.type);
          if (isActivityTransfer(it)) transferCount++;
          if (isActivityGeneration(it)) genCount++;
          for (const t of itemTokens[idx]) {
            if (requiredTokens.has(t)) covered.add(t);
          }
        }

        if (covered.size === coverableTokens.size) {
          foundCompleteForK = true;
          const diversityScore = types.size * 10 + transferCount * 2 + genCount;
          if (diversityScore > bestDiversity) {
            bestDiversity = diversityScore;
            bestChosen = [...chosen];
          }
        }
      };

      const searchK = (start: number, chosen: number[]) => {
        if (chosen.length === k) {
          evaluateCombination(chosen);
          return;
        }
        for (let i = start; i < n; i++) {
          chosen.push(i);
          searchK(i + 1, chosen);
          chosen.pop();
        }
      };

      searchK(0, []);
      if (foundCompleteForK && bestChosen) {
        return {
          isExact: coverableTokens.size === requiredTokens.size,
          count: k,
          selectedItems: bestChosen.map(idx => items[idx]),
        };
      }
    }
  }

  // Prioritized greedy fallback for pools > 15
  const covered = new Set<string>();
  const selectedIndices: number[] = [];
  const pool = items.map((item, idx) => ({ item, idx, tokens: itemTokens[idx] }));

  while (covered.size < coverableTokens.size && pool.length > 0) {
    let bestIdxInPool = -1;
    let bestScore = -1;

    for (let i = 0; i < pool.length; i++) {
      const cand = pool[i];
      let newTokensCount = 0;
      let priorityScore = 0;

      for (const t of cand.tokens) {
        if (requiredTokens.has(t) && !covered.has(t)) {
          newTokensCount++;
          if (t.includes('safety')) priorityScore += 10;
          else if (t.includes('decision')) priorityScore += 8;
          else if (t.includes('differentiation')) priorityScore += 6;
          else if (t.includes('transfer')) priorityScore += 4;
          else if (t.includes('application_or_generation')) priorityScore += 2;
          else priorityScore += 1;
        }
      }

      if (newTokensCount > 0) {
        const typesAlready = new Set(selectedIndices.map(idx => items[idx].type));
        const diversityBonus = typesAlready.has(cand.item.type) ? 0 : 2;
        const totalCandidateScore = priorityScore * 10 + newTokensCount * 5 + diversityBonus;
        if (totalCandidateScore > bestScore) {
          bestScore = totalCandidateScore;
          bestIdxInPool = i;
        }
      }
    }

    if (bestIdxInPool === -1) break;

    const chosen = pool.splice(bestIdxInPool, 1)[0];
    selectedIndices.push(chosen.idx);
    for (const t of chosen.tokens) {
      if (requiredTokens.has(t)) covered.add(t);
    }
  }

  return {
    isExact: false,
    count: selectedIndices.length,
    selectedItems: selectedIndices.map(idx => items[idx]),
  };
}
