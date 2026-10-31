/**
 * 2934. Minimum Operations to Maximize Last Elements in Arrays
 *
 * An operation swaps `nums1[i]` with `nums2[i]`. Returns the fewest
 * operations after which each array's last element is its maximum, or
 * -1.
 *
 * Try leaving the last pair as it is and swapping it. Either way, every
 * other index must fit under the two caps, as it stands or swapped; count
 * the swaps forced.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-maximize-last-elements-in-arrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToMaximizeLastElementsInArrays([2, 3, 4, 5, 9], [8, 8, 4, 4, 4]); // 2
 */
export const minimumOperationsToMaximizeLastElementsInArrays = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const n = nums1.length;
	const count = (cap1: number, cap2: number, start: number): number => {
		let swaps = start;
		for (let i = 0; i < n - 1; i++) {
			const a = nums1[i] ?? 0;
			const b = nums2[i] ?? 0;
			if (a <= cap1 && b <= cap2) continue;
			if (b <= cap1 && a <= cap2) swaps++;
			else return Number.POSITIVE_INFINITY;
		}
		return swaps;
	};
	const last1 = nums1[n - 1] ?? 0;
	const last2 = nums2[n - 1] ?? 0;
	const best = Math.min(count(last1, last2, 0), count(last2, last1, 1));
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};
