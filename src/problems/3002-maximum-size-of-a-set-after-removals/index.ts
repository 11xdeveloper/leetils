/**
 * 3002. Maximum Size of a Set After Removals
 *
 * Remove `n / 2` elements from each of two arrays of even length `n`, then
 * put what's left of both into a set. Returns the largest the set can be.
 *
 * Each array keeps `n / 2` elements. Spend them on values unique to that
 * array first, as many as fit, then fill the remaining room with values the
 * arrays share.
 *
 * @see https://leetcode.com/problems/maximum-size-of-a-set-after-removals/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSizeOfASetAfterRemovals([1, 2, 1, 2], [1, 1, 1, 1]); // 2
 */
export const maximumSizeOfASetAfterRemovals = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const half = nums1.length / 2;
	const set1 = new Set(nums1);
	const set2 = new Set(nums2);
	let shared = 0;
	for (const value of set1) if (set2.has(value)) shared++;
	const only1 = Math.min(set1.size - shared, half);
	const only2 = Math.min(set2.size - shared, half);
	return Math.min(only1 + only2 + shared, 2 * half);
};
