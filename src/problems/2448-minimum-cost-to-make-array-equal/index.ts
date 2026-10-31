/**
 * 2448. Minimum Cost to Make Array Equal
 *
 * Changing `nums[i]` by 1 costs `cost[i]`. Returns the least cost to make
 * every element equal.
 *
 * The total cost is convex in the target, minimised at a weighted median:
 * the first value (sorted) where the cumulative cost reaches half. Sums
 * are taken in BigInt since they can exceed 2^53.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-make-array-equal/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostToMakeArrayEqual([1, 3, 5, 2], [2, 3, 1, 14]); // 8
 */
export const minimumCostToMakeArrayEqual = (
	nums: readonly number[],
	cost: readonly number[],
): number => {
	const order = nums
		.map((_, i) => i)
		.sort((a, b) => (nums[a] ?? 0) - (nums[b] ?? 0));
	const total = cost.reduce((sum, c) => sum + c, 0);
	let [running, target] = [0, 0];
	for (const i of order) {
		running += cost[i] ?? 0;
		if (2 * running >= total) {
			target = nums[i] ?? 0;
			break;
		}
	}
	let sum = 0n;
	for (const [i, num] of nums.entries())
		sum += BigInt(Math.abs(num - target)) * BigInt(cost[i] ?? 0);
	return Number(sum);
};
