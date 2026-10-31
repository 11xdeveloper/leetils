/**
 * 3690. Split and Merge Array Transformation
 *
 * One operation cuts out a subarray and pastes it back anywhere. Returns
 * the fewest operations turning `nums1` into `nums2` (a rearrangement of
 * it, at most six elements).
 *
 * Breadth-first search over arrangements, of which there are at most 6!.
 *
 * @see https://leetcode.com/problems/split-and-merge-array-transformation/
 * @difficulty Medium
 * @timeComplexity O(n! · n⁴)
 * @spaceComplexity O(n! · n)
 *
 * @example
 * splitAndMergeArrayTransformation([3, 1, 2], [1, 2, 3]); // 1
 */
export const splitAndMergeArrayTransformation = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const n = nums1.length;
	const goal = nums2.join();
	const distance = new Map([[nums1.join(), 0]]);
	const queue: number[][] = [[...nums1]];
	for (let q = 0; q < queue.length; q++) {
		const current = queue[q] ?? [];
		const steps = distance.get(current.join()) ?? 0;
		if (current.join() === goal) return steps;
		for (let l = 0; l < n; l++)
			for (let r = l; r < n; r++) {
				const piece = current.slice(l, r + 1);
				const rest = [...current.slice(0, l), ...current.slice(r + 1)];
				for (let at = 0; at <= rest.length; at++) {
					const next = [...rest.slice(0, at), ...piece, ...rest.slice(at)];
					const key = next.join();
					if (distance.has(key)) continue;
					distance.set(key, steps + 1);
					queue.push(next);
				}
			}
	}
	return -1;
};
