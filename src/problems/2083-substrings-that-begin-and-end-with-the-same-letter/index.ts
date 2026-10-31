/**
 * 2083. Substrings That Begin and End With the Same Letter
 *
 * Counts the substrings of `s` that start and end with the same letter.
 *
 * A letter occurring `c` times starts and ends `c · (c + 1) / 2` of them.
 *
 * @see https://leetcode.com/problems/substrings-that-begin-and-end-with-the-same-letter/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * substringsThatBeginAndEndWithTheSameLetter("abcba"); // 7
 */
export const substringsThatBeginAndEndWithTheSameLetter = (
	s: string,
): number => {
	const seen = new Map<string, number>();
	let count = 0;
	for (const char of s) {
		const before = (seen.get(char) ?? 0) + 1;
		seen.set(char, before);
		count += before;
	}
	return count;
};
