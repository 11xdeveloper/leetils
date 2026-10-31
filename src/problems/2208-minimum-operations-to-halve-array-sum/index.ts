import { Heap } from "../../internal/heap";

/**
 * 2208. Minimum Operations to Halve Array Sum
 *
 * An operation halves one number (exactly, possibly reusing it). Returns
 * the fewest operations to reduce the array's sum by at least half.
 *
 * Halving the largest number always reduces the sum most.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-halve-array-sum/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToHalveArraySum([5, 19, 8, 1]); // 3
 */
export const minimumOperationsToHalveArraySum = (
	nums: readonly number[],
): number => {
	const heap = new Heap<number>((a, b) => b - a, nums);
	const target = nums.reduce((sum, v) => sum + v, 0) / 2;
	let [reduced, operations] = [0, 0];
	while (reduced < target) {
		const half = (heap.pop() ?? 0) / 2;
		reduced += half;
		heap.push(half);
		operations++;
	}
	return operations;
};
