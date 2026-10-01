/**
 * 494. Target Sum
 *
 * Counts the ways to put `+` or `-` before each number in `nums` so the
 * expression equals `target`.
 *
 * If the numbers given `+` sum to `p`, the expression is `p - (total - p)`,
 * so `p` must be `(total + target) / 2`. That turns it into counting subsets
 * with a given sum, a 0/1 knapsack over sums.
 *
 * @see https://leetcode.com/problems/target-sum/
 * @difficulty Medium
 * @timeComplexity O(n · total)
 * @spaceComplexity O(total)
 *
 * @example
 * targetSum([1, 1, 1, 1, 1], 3); // 5
 */
export const targetSum = (nums: readonly number[], target: number): number => {
	const total = nums.reduce((sum, num) => sum + num, 0);
	if (Math.abs(target) > total || (total + target) % 2 !== 0) return 0;

	const goal = (total + target) / 2;
	const ways = new Array<number>(goal + 1).fill(0);
	ways[0] = 1;
	for (const num of nums) {
		for (let sum = goal; sum >= num; sum--)
			ways[sum] = (ways[sum] ?? 0) + (ways[sum - num] ?? 0);
	}

	return ways[goal] ?? 0;
};
