/**
 * 1770. Maximum Score from Performing Multiplication Operations
 *
 * Operation `i` removes an element from either end of `nums` and scores it
 * times `multipliers[i]`. Returns the largest score after all `m`
 * operations.
 *
 * After `i` operations with `left` taken from the front, the remaining
 * array is fixed, so dynamic programming over `(i, left)`, filled from the
 * last operation backward.
 *
 * @see https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations/
 * @difficulty Hard
 * @timeComplexity O(m^2)
 * @spaceComplexity O(m)
 *
 * @example
 * maximumScoreFromPerformingMultiplicationOperations([-5, -3, -3, -2, 7, 1], [-10, -5, 3, 4, 6]); // 102
 */
export const maximumScoreFromPerformingMultiplicationOperations = (
	nums: readonly number[],
	multipliers: readonly number[],
): number => {
	const [n, m] = [nums.length, multipliers.length];
	// best[left] for the operations from i onward, having taken `left` from the front.
	let best = new Array<number>(m + 1).fill(0);
	for (let i = m - 1; i >= 0; i--) {
		const multiplier = multipliers[i] ?? 0;
		const next = new Array<number>(i + 1).fill(0);
		for (let left = 0; left <= i; left++) {
			const right = n - 1 - (i - left);
			next[left] = Math.max(
				multiplier * (nums[left] ?? 0) + (best[left + 1] ?? 0),
				multiplier * (nums[right] ?? 0) + (best[left] ?? 0),
			);
		}
		best = next;
	}
	return best[0] ?? 0;
};
