/**
 * 3131. Find the Integer Added to Array I
 *
 * The x such that adding it to every element of `nums1` gives `nums2` as a
 * multiset.
 *
 * The minimums must line up.
 *
 * @see https://leetcode.com/problems/find-the-integer-added-to-array-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheIntegerAddedToArrayI([2, 6, 4], [9, 7, 5]); // 3
 */
export const findTheIntegerAddedToArrayI = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => Math.min(...nums2) - Math.min(...nums1);
