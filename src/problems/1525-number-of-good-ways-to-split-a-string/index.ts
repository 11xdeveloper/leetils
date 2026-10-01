/**
 * 1525. Number of Good Ways to Split a String
 *
 * Counts the ways to split `s` into two non-empty parts with the same
 * number of distinct letters.
 *
 * Counts the letters on the right, then moves letters across one by one,
 * tracking how many distinct letters each side has.
 *
 * @see https://leetcode.com/problems/number-of-good-ways-to-split-a-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1), 26 letters
 *
 * @example
 * numberOfGoodWaysToSplitAString("aacaba"); // 2
 */
export const numberOfGoodWaysToSplitAString = (s: string): number => {
	const right = new Map<string, number>();
	for (const char of s) right.set(char, (right.get(char) ?? 0) + 1);
	const left = new Set<string>();
	let good = 0;
	for (let i = 0; i < s.length - 1; i++) {
		const char = s[i] ?? "";
		left.add(char);
		const remaining = (right.get(char) ?? 0) - 1;
		if (remaining === 0) right.delete(char);
		else right.set(char, remaining);
		if (left.size === right.size) good++;
	}
	return good;
};
