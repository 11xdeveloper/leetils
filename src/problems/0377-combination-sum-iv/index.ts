/**
 * 377. Combination Sum IV
 *
 * Returns how many ordered sequences of values from `nums` (distinct
 * positive integers, each usable any number of times) add up to `target`.
 * Different orders count separately.
 *
 * Dynamic programming over totals: the ways to reach a total are the sum,
 * over each value, of the ways to reach the total minus that value, since
 * that value could be the last in the sequence.
 *
 * @see https://leetcode.com/problems/combination-sum-iv/
 * @difficulty Medium
 * @timeComplexity O(target * n)
 * @spaceComplexity O(target)
 *
 * @example
 * combinationSumIV([1, 2, 3], 4); // 7
 */
export const combinationSumIV = (
	nums: readonly number[],
	target: number,
): number => {
	const ways = new Array<number>(target + 1).fill(0);
	ways[0] = 1;

	for (let total = 1; total <= target; total++) {
		for (const num of nums)
			if (num <= total)
				ways[total] = (ways[total] ?? 0) + (ways[total - num] ?? 0);
	}

	return ways[target] ?? 0;
};
