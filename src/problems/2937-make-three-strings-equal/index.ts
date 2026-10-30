/**
 * 2937. Make Three Strings Equal
 *
 * Each operation deletes the last character of a string of length at
 * least 2. Returns the fewest operations to make the three strings
 * equal, or -1.
 *
 * They can only meet at their longest common prefix, which must be
 * non-empty; delete everything after it.
 *
 * @see https://leetcode.com/problems/make-three-strings-equal/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * makeThreeStringsEqual("abc", "abb", "ab"); // 2
 */
export const makeThreeStringsEqual = (
	s1: string,
	s2: string,
	s3: string,
): number => {
	let common = 0;
	while (
		common < Math.min(s1.length, s2.length, s3.length) &&
		s1.charAt(common) === s2.charAt(common) &&
		s1.charAt(common) === s3.charAt(common)
	)
		common++;
	return common === 0 ? -1 : s1.length + s2.length + s3.length - 3 * common;
};
