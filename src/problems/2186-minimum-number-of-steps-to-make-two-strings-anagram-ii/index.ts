/**
 * 2186. Minimum Number of Steps to Make Two Strings Anagram II
 *
 * A step appends any letter to either string. Returns the fewest steps to
 * make `s` and `t` anagrams.
 *
 * Each letter needs as many steps as its counts differ by.
 *
 * @see https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram-ii/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfStepsToMakeTwoStringsAnagramII("leetcode", "coats"); // 7
 */
export const minimumNumberOfStepsToMakeTwoStringsAnagramII = (
	s: string,
	t: string,
): number => {
	const difference = new Map<string, number>();
	for (const char of s) difference.set(char, (difference.get(char) ?? 0) + 1);
	for (const char of t) difference.set(char, (difference.get(char) ?? 0) - 1);
	let steps = 0;
	for (const d of difference.values()) steps += Math.abs(d);
	return steps;
};
