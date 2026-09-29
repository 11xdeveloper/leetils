import { Heap } from "../../internal/heap";

/**
 * 373. Find K Pairs with Smallest Sums
 *
 * Given two arrays sorted in ascending order, returns the `k` pairs
 * `[nums1[i], nums2[j]]` with the smallest sums, smallest first.
 *
 * Pairs `(i, j)` form a grid whose sums increase along rows and columns. A
 * min-heap starts with `(i, 0)` for the first `k` rows; each time the
 * smallest pair is taken, the pair to its right joins the heap. The heap
 * never holds more than `k` pairs.
 *
 * @see https://leetcode.com/problems/find-k-pairs-with-smallest-sums/
 * @difficulty Medium
 * @timeComplexity O(k log k)
 * @spaceComplexity O(k)
 *
 * @example
 * findKPairsWithSmallestSums([1, 7, 11], [2, 4, 6], 3); // [[1, 2], [1, 4], [1, 6]]
 */
export const findKPairsWithSmallestSums = (
	nums1: readonly number[],
	nums2: readonly number[],
	k: number,
): number[][] => {
	const sum = ([i, j]: [number, number]): number =>
		(nums1[i] ?? 0) + (nums2[j] ?? 0);
	const heap = new Heap<[number, number]>((a, b) => sum(a) - sum(b));
	for (let i = 0; i < Math.min(k, nums1.length); i++)
		if (nums2.length > 0) heap.push([i, 0]);

	const pairs: number[][] = [];
	while (pairs.length < k && heap.size > 0) {
		const [i, j] = heap.pop() ?? [0, 0];
		pairs.push([nums1[i] ?? 0, nums2[j] ?? 0]);
		if (j + 1 < nums2.length) heap.push([i, j + 1]);
	}

	return pairs;
};
