import { Heap } from "../../internal/heap";

/**
 * 632. Smallest Range Covering Elements from K Lists
 *
 * Given `k` lists sorted in ascending order, returns the smallest range
 * `[a, b]` containing at least one number from each list. A range is
 * smaller if it's narrower, or equally wide and starts earlier.
 *
 * Keeps one pointer per list, starting at the front, with the pointed-at
 * numbers in a min-heap and their maximum tracked. They always cover every
 * list, and the range from the heap's minimum to that maximum is a
 * candidate. Advancing the list holding the minimum is the only move that
 * could narrow it; when that list runs out, it's done.
 *
 * @see https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/
 * @difficulty Hard
 * @timeComplexity O(N log k) for N numbers in total
 * @spaceComplexity O(k)
 *
 * @example
 * smallestRangeCoveringElementsFromKLists([[4, 10, 15, 24, 26], [0, 9, 12, 20], [5, 18, 22, 30]]); // [20, 24]
 */
export const smallestRangeCoveringElementsFromKLists = (
	nums: readonly (readonly number[])[],
): number[] => {
	type Pointer = [value: number, list: number, index: number];
	const heap = new Heap<Pointer>(
		(a, b) => a[0] - b[0],
		nums.map((list, i): Pointer => [list[0] ?? 0, i, 0]),
	);
	let max = Math.max(...nums.map((list) => list[0] ?? 0));
	let best = [heap.peek()?.[0] ?? 0, max];

	for (;;) {
		const [min, list, index] = heap.pop() ?? [0, 0, 0];
		if (max - min < (best[1] ?? 0) - (best[0] ?? 0)) best = [min, max];
		const next = nums[list]?.[index + 1];
		if (next === undefined) return best;
		max = Math.max(max, next);
		heap.push([next, list, index + 1]);
	}
};
