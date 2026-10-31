import { Heap } from "../../internal/heap";

/**
 * 3362. Zero Array Transformation III
 *
 * Each query `[l, r]` may decrement each index in its range by up to 1.
 * Returns the most queries that can be thrown away while the rest still
 * turn `nums` into all zeros, or -1 if even all of them can't.
 *
 * Sweep the indices. Queries starting by the current index become
 * available; when it isn't covered enough, use the available query that
 * reaches farthest right, since it helps the most later indices.
 *
 * @see https://leetcode.com/problems/zero-array-transformation-iii/
 * @difficulty Medium
 * @timeComplexity O((n + q) log q)
 * @spaceComplexity O(n + q)
 *
 * @example
 * zeroArrayTransformationIII([2, 0, 2], [[0, 2], [0, 2], [1, 1]]); // 1
 */
export const zeroArrayTransformationIII = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number => {
	const sorted = queries.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	const available = new Heap<number>((a, b) => b - a);
	const ends = new Int32Array(nums.length + 1);
	let next = 0;
	let cover = 0;
	let used = 0;
	for (let i = 0; i < nums.length; i++) {
		cover -= ends[i] ?? 0;
		while (next < sorted.length && (sorted[next]?.[0] ?? 0) <= i)
			available.push(sorted[next++]?.[1] ?? 0);
		while (cover < (nums[i] ?? 0)) {
			const end = available.pop();
			if (end === undefined || end < i) return -1;
			cover++;
			used++;
			ends[end + 1] = (ends[end + 1] ?? 0) + 1;
		}
	}
	return queries.length - used;
};
