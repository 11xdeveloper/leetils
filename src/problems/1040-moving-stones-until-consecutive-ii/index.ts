/**
 * 1040. Moving Stones Until Consecutive II
 *
 * Stones sit at distinct positions. A move takes an end stone (smallest or
 * largest) and places it at an empty position where it's no longer an end
 * stone. Returns `[fewest moves, most moves]` until the stones are
 * consecutive.
 *
 * Most: the first move gives up the gap at one end, then every remaining
 * empty position is filled one by one. Fewest: slide a window of `n`
 * positions over the sorted stones; the stones outside it must each move,
 * except for the case of `n - 1` consecutive stones with the last far
 * away, which takes 2.
 *
 * @see https://leetcode.com/problems/moving-stones-until-consecutive-ii/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * movingStonesUntilConsecutiveII([7, 4, 9]); // [1, 2]
 */
export const movingStonesUntilConsecutiveII = (
	stones: readonly number[],
): number[] => {
	const s = stones.toSorted((a, b) => a - b);
	const n = s.length;
	const at = (i: number): number => s[i] ?? 0;
	const most = Math.max(at(n - 1) - at(1) - n + 2, at(n - 2) - at(0) - n + 2);

	let fewest = n;
	for (let left = 0, right = 0; right < n; right++) {
		while (at(right) - at(left) + 1 > n) left++;
		const inside = right - left + 1;
		if (inside === n - 1 && at(right) - at(left) + 1 === n - 1)
			fewest = Math.min(fewest, 2);
		else fewest = Math.min(fewest, n - inside);
	}
	return [fewest, most];
};
