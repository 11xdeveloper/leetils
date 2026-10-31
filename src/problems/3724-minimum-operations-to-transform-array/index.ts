/**
 * 3724. Minimum Operations to Transform Array
 *
 * Turn `nums1` into `nums2` (one longer) by incrementing or decrementing
 * elements and appending, once, a copy of some element. Returns the
 * fewest operations.
 *
 * Each element walks straight to its target; the copy is best taken from
 * some element mid-walk at the value closest to the last target, then
 * adjusted the rest of the way.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-transform-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToTransformArray([2, 8], [1, 7, 3]); // 4
 */
export const minimumOperationsToTransformArray = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const last = nums2.at(-1) ?? 0;
	let total = 1;
	let extra = Number.POSITIVE_INFINITY;
	nums1.forEach((from, i) => {
		const to = nums2[i] ?? 0;
		total += Math.abs(from - to);
		const [low, high] = from < to ? [from, to] : [to, from];
		extra = Math.min(
			extra,
			last < low ? low - last : last > high ? last - high : 0,
		);
	});
	return total + extra;
};
