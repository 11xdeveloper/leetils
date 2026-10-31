import { Heap } from "../../internal/heap";

/**
 * 3066. Minimum Operations to Exceed Threshold Value II
 *
 * Repeatedly replace the two smallest elements `x ≤ y` of `nums` with
 * `2x + y`. Returns how many replacements it takes for every element to be
 * at least `k`.
 *
 * Simulate with a min-heap.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-exceed-threshold-value-ii/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToExceedThresholdValueII([2, 11, 10, 1, 3], 10); // 2
 */
export const minimumOperationsToExceedThresholdValueII = (
	nums: readonly number[],
	k: number,
): number => {
	const heap = new Heap<number>((a, b) => a - b, nums);
	let operations = 0;
	while ((heap.peek() ?? k) < k) {
		const x = heap.pop() ?? 0;
		const y = heap.pop() ?? 0;
		heap.push(2 * x + y);
		operations++;
	}
	return operations;
};
