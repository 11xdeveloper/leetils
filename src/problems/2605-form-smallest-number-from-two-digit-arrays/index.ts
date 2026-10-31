/**
 * 2605. Form Smallest Number From Two Digit Arrays
 *
 * Returns the smallest number containing at least one digit from each
 * array of distinct non-zero digits.
 *
 * A shared digit works alone, so take the smallest one; otherwise put
 * the smaller of the two minimums first.
 *
 * @see https://leetcode.com/problems/form-smallest-number-from-two-digit-arrays/
 * @difficulty Easy
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n)
 *
 * @example
 * formSmallestNumberFromTwoDigitArrays([4, 1, 3], [5, 7]); // 15
 */
export const formSmallestNumberFromTwoDigitArrays = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const first = new Set(nums1);
	const shared = nums2.filter((digit) => first.has(digit));
	if (shared.length > 0) return Math.min(...shared);
	const a = Math.min(...nums1);
	const b = Math.min(...nums2);
	return Math.min(a, b) * 10 + Math.max(a, b);
};
