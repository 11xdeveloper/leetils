/**
 * 2786. Visit Array Positions to Maximize Score
 *
 * Starting at index 0 with score `nums[0]`, you may move to any later
 * index, adding its value but losing `x` whenever the parity changes.
 * Returns the largest score.
 *
 * Track the best score ending on an even and on an odd value.
 *
 * @see https://leetcode.com/problems/visit-array-positions-to-maximize-score/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * visitArrayPositionsToMaximizeScore([2, 3, 6, 1, 9, 2], 5); // 13
 */
export const visitArrayPositionsToMaximizeScore = (
	nums: readonly number[],
	x: number,
): number => {
	const best = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];
	const first = nums[0] ?? 0;
	best[first % 2] = first;
	for (const num of nums.slice(1)) {
		const parity = num % 2;
		const score =
			num + Math.max(best[parity] ?? 0, (best[1 - parity] ?? 0) - x);
		best[parity] = Math.max(best[parity] ?? 0, score);
	}
	return Math.max(...best);
};
