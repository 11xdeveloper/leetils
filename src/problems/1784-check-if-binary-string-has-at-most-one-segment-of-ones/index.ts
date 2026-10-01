/**
 * 1784. Check if Binary String Has at Most One Segment of Ones
 *
 * Returns whether the binary string `s` (starting with 1) has at most one
 * contiguous run of ones.
 *
 * A second run would need a `1` after a `0`.
 *
 * @see https://leetcode.com/problems/check-if-binary-string-has-at-most-one-segment-of-ones/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfBinaryStringHasAtMostOneSegmentOfOnes("1001"); // false
 */
export const checkIfBinaryStringHasAtMostOneSegmentOfOnes = (
	s: string,
): boolean => !s.includes("01");
