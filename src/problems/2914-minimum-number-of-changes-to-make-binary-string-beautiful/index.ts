/**
 * 2914. Minimum Number of Changes to Make Binary String Beautiful
 *
 * A binary string of even length is beautiful if it splits into
 * even-length pieces of a single repeated bit. Returns the fewest bit
 * changes that make `s` beautiful.
 *
 * Every aligned pair must match, and any string of matching pairs is
 * beautiful, so count the mismatched pairs.
 *
 * @see https://leetcode.com/problems/minimum-number-of-changes-to-make-binary-string-beautiful/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfChangesToMakeBinaryStringBeautiful("1001"); // 2
 */
export const minimumNumberOfChangesToMakeBinaryStringBeautiful = (
	s: string,
): number => {
	let changes = 0;
	for (let i = 0; i < s.length; i += 2)
		if (s.charAt(i) !== s.charAt(i + 1)) changes++;
	return changes;
};
