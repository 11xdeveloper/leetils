import { Heap } from "../../internal/heap";

/**
 * 3672. Sum of Weighted Modes in Subarrays
 *
 * For every window of `k` consecutive elements, take its mode (the most
 * frequent value, the smallest on ties) times its frequency. Returns the
 * sum over all windows.
 *
 * Slide the window, pushing (count, value) onto a heap whenever a count
 * changes, and skip stale entries at the top.
 *
 * @see https://leetcode.com/problems/sum-of-weighted-modes-in-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfWeightedModesInSubarrays([4, 3, 4, 3], 3); // 14
 */
export const sumOfWeightedModesInSubarrays = (
	nums: readonly number[],
	k: number,
): number => {
	const counts = new Map<number, number>();
	const heap = new Heap<[count: number, value: number]>(
		(a, b) => b[0] - a[0] || a[1] - b[1],
	);
	const change = (value: number, delta: number): void => {
		const count = (counts.get(value) ?? 0) + delta;
		counts.set(value, count);
		if (count > 0) heap.push([count, value]);
	};
	let total = 0;
	nums.forEach((num, i) => {
		change(num, 1);
		if (i >= k) change(nums[i - k] ?? 0, -1);
		if (i < k - 1) return;
		for (
			let top = heap.peek();
			top && counts.get(top[1]) !== top[0];
			top = heap.peek()
		)
			heap.pop();
		const [count, value] = heap.peek() ?? [0, 0];
		total += count * value;
	});
	return total;
};
