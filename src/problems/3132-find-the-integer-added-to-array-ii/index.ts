/**
 * 3132. Find the Integer Added to Array II
 *
 * Remove two elements from `nums1` and add x to the rest so it equals
 * `nums2` as a multiset. Returns the smallest x that works.
 *
 * After sorting, `nums2`'s minimum matches one of `nums1`'s three smallest.
 * Try each, largest first (giving the smallest x), checking that the
 * shifted `nums2` is a subsequence of sorted `nums1`.
 *
 * @see https://leetcode.com/problems/find-the-integer-added-to-array-ii/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheIntegerAddedToArrayII([4, 20, 16, 12, 8], [14, 18, 10]); // -2
 */
export const findTheIntegerAddedToArrayII = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const a = nums1.toSorted((p, q) => p - q);
	const b = nums2.toSorted((p, q) => p - q);
	for (let start = 2; start >= 0; start--) {
		const x = (b[0] ?? 0) - (a[start] ?? 0);
		let j = 0;
		for (let i = 0; i < a.length && j < b.length; i++)
			if ((a[i] ?? 0) + x === b[j]) j++;
		if (j === b.length) return x;
	}
	return 0;
};
