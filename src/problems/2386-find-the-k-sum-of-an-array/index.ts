import { Heap } from "../../internal/heap";

/**
 * 2386. Find the K-Sum of an Array
 *
 * Returns the `k`-th largest subsequence sum of `nums` (the empty
 * subsequence counts, as 0).
 *
 * The largest sum takes every positive number. Any other sum drops some
 * positives or adds some negatives, costing the sum of their absolute
 * values, so find the `(k - 1)`-th smallest non-empty subset sum of the
 * sorted absolute values: from a subset ending at `i`, the next ones add
 * `i + 1` or swap `i` for it.
 *
 * @see https://leetcode.com/problems/find-the-k-sum-of-an-array/
 * @difficulty Hard
 * @timeComplexity O(n log n + k log k)
 * @spaceComplexity O(n + k)
 *
 * @example
 * findTheKSumOfAnArray([2, 4, -2], 5); // 2
 */
export const findTheKSumOfAnArray = (
	nums: readonly number[],
	k: number,
): number => {
	const largest = nums.reduce((sum, num) => sum + Math.max(0, num), 0);
	const costs = nums.map(Math.abs).sort((a, b) => a - b);
	const heap = new Heap<[cost: number, last: number]>((a, b) => a[0] - b[0]);
	if (costs.length) heap.push([costs[0] ?? 0, 0]);
	let cost = 0;
	for (let found = 1; found < k; found++) {
		const [subset = 0, last = 0] = heap.pop() ?? [];
		cost = subset;
		const next = costs[last + 1];
		if (next === undefined) continue;
		heap.push([subset + next, last + 1]);
		heap.push([subset - (costs[last] ?? 0) + next, last + 1]);
	}
	return largest - cost;
};
