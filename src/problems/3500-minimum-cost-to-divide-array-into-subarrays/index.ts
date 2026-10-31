/**
 * 3500. Minimum Cost to Divide Array Into Subarrays
 *
 * Split `nums` into consecutive subarrays; the i-th (from 1), ending at r,
 * costs (nums[0] + … + nums[r] + k · i) times the sum of its `cost`s.
 * Returns the smallest total.
 *
 * The k · i part adds up to k times, for each subarray, the cost of
 * everything from its start to the end of the array, so it no longer
 * depends on i. That leaves a quadratic dynamic program over where the
 * last subarray starts.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-divide-array-into-subarrays/
 * @difficulty Hard
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostToDivideArrayIntoSubarrays([3, 1, 4], [4, 6, 6], 1); // 110
 */
export const minimumCostToDivideArrayIntoSubarrays = (
	nums: readonly number[],
	cost: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const sums = [0];
	const costs = [0];
	nums.forEach((num, i) => {
		sums.push((sums.at(-1) ?? 0) + num);
		costs.push((costs.at(-1) ?? 0) + (cost[i] ?? 0));
	});
	const totalCost = costs[n] ?? 0;
	const best = new Float64Array(n + 1).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	for (let r = 1; r <= n; r++)
		for (let l = 0; l < r; l++) {
			const piece =
				(sums[r] ?? 0) * ((costs[r] ?? 0) - (costs[l] ?? 0)) +
				k * (totalCost - (costs[l] ?? 0));
			best[r] = Math.min(best[r] ?? 0, (best[l] ?? 0) + piece);
		}
	return best[n] ?? 0;
};
