/**
 * 4. Median of Two Sorted Arrays
 *
 * Returns the median of two arrays that are each sorted in non-decreasing
 * order, without merging them.
 *
 * Binary searches the shorter array for a split point such that, combined
 * with the matching split of the longer array, the left halves hold the
 * smallest half of all values. The median then comes from the values either
 * side of the split.
 *
 * @see https://leetcode.com/problems/median-of-two-sorted-arrays/
 * @difficulty Hard
 * @timeComplexity O(log(min(m, n)))
 * @spaceComplexity O(1)
 *
 * @example
 * medianOfTwoSortedArrays([1, 3], [2]); // 2
 * medianOfTwoSortedArrays([1, 2], [3, 4]); // 2.5
 */
export const medianOfTwoSortedArrays = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const [short, long] =
		nums1.length <= nums2.length ? [nums1, nums2] : [nums2, nums1];
	const total = short.length + long.length;
	const leftSize = Math.ceil(total / 2);

	let low = 0;
	let high = short.length;

	while (low <= high) {
		// Take `i` values from the short array and `j` from the long one.
		const i = Math.floor((low + high) / 2);
		const j = leftSize - i;

		// Out-of-range reads are undefined, which stand for -Infinity or Infinity.
		const shortLeft = short[i - 1] ?? Number.NEGATIVE_INFINITY;
		const shortRight = short[i] ?? Number.POSITIVE_INFINITY;
		const longLeft = long[j - 1] ?? Number.NEGATIVE_INFINITY;
		const longRight = long[j] ?? Number.POSITIVE_INFINITY;

		if (shortLeft > longRight) {
			high = i - 1;
		} else if (longLeft > shortRight) {
			low = i + 1;
		} else {
			const leftMax = Math.max(shortLeft, longLeft);
			return total % 2 === 1
				? leftMax
				: (leftMax + Math.min(shortRight, longRight)) / 2;
		}
	}

	throw new Error("nums1 and nums2 must be sorted in non-decreasing order");
};
