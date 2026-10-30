/**
 * 2547. Minimum Cost to Split an Array
 *
 * Splitting `nums` into subarrays costs, for each subarray, `k` plus the
 * number of its elements whose value appears more than once in it.
 * Returns the cheapest split.
 *
 * Dynamic programming over prefixes: for each end, extend the last
 * subarray leftwards, updating its repeated-element count as values
 * reappear.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-split-an-array/
 * @difficulty Hard
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostToSplitAnArray([1, 2, 1, 2, 1, 3, 3], 2); // 8
 */
export const minimumCostToSplitAnArray = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const cost = [0];
	for (let end = 1; end <= n; end++) {
		const counts = new Map<number, number>();
		let repeated = 0;
		let best = Number.POSITIVE_INFINITY;
		for (let start = end - 1; start >= 0; start--) {
			const value = nums[start] ?? 0;
			const count = (counts.get(value) ?? 0) + 1;
			counts.set(value, count);
			if (count === 2) repeated += 2;
			else if (count > 2) repeated++;
			best = Math.min(best, (cost[start] ?? 0) + k + repeated);
		}
		cost.push(best);
	}
	return cost[n] ?? 0;
};
