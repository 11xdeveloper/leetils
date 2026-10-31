/**
 * 3400. Maximum Number of Matching Indices After Right Shifts
 *
 * Rotate `nums1` right any number of times. Returns the most indices where
 * it can match `nums2`.
 *
 * Try every rotation.
 *
 * @see https://leetcode.com/problems/maximum-number-of-matching-indices-after-right-shifts/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberOfMatchingIndicesAfterRightShifts([3, 1, 2, 3, 1, 2], [1, 2, 3, 1, 2, 3]); // 6
 */
export const maximumNumberOfMatchingIndicesAfterRightShifts = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const n = nums1.length;
	let best = 0;
	for (let shift = 0; shift < n; shift++) {
		let matches = 0;
		for (let i = 0; i < n; i++)
			if (nums1[(i - shift + n) % n] === nums2[i]) matches++;
		best = Math.max(best, matches);
	}
	return best;
};
