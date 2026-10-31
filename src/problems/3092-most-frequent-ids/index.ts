import { Heap } from "../../internal/heap";

/**
 * 3092. Most Frequent IDs
 *
 * Step i adds `freq[i]` copies of ID `nums[i]` to a collection (removing
 * them if negative). Returns the highest count of any ID after each step,
 * or 0 when the collection is empty.
 *
 * Keep the current counts, and a max-heap of (count, ID) entries pushed on
 * every change. Entries that no longer match their ID's count are stale and
 * dropped when they reach the top.
 *
 * @see https://leetcode.com/problems/most-frequent-ids/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * mostFrequentIds([2, 3, 2, 1], [3, 2, -3, 1]); // [3, 3, 2, 2]
 */
export const mostFrequentIds = (
	nums: readonly number[],
	freq: readonly number[],
): number[] => {
	const counts = new Map<number, number>();
	const heap = new Heap<[count: number, id: number]>((a, b) => b[0] - a[0]);
	return nums.map((id, i) => {
		const count = (counts.get(id) ?? 0) + (freq[i] ?? 0);
		counts.set(id, count);
		heap.push([count, id]);
		for (
			let top = heap.peek();
			top && counts.get(top[1]) !== top[0];
			top = heap.peek()
		)
			heap.pop();
		return heap.peek()?.[0] ?? 0;
	});
};
