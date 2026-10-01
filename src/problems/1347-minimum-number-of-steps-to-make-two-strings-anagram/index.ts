/**
 * 1347. Minimum Number of Steps to Make Two Strings Anagram
 *
 * A step replaces one character of `t`. Returns the fewest steps to make
 * `t` an anagram of `s` (they're the same length).
 *
 * Every letter `t` has more of than `s` must be replaced, once per extra
 * copy.
 *
 * @see https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1), 26 letters
 *
 * @example
 * minimumNumberOfStepsToMakeTwoStringsAnagram("leetcode", "practice"); // 5
 */
export const minimumNumberOfStepsToMakeTwoStringsAnagram = (
	s: string,
	t: string,
): number => {
	const balance = new Array<number>(26).fill(0);
	for (let i = 0; i < s.length; i++) {
		const [a, b] = [s.charCodeAt(i) - 97, t.charCodeAt(i) - 97];
		balance[a] = (balance[a] ?? 0) + 1;
		balance[b] = (balance[b] ?? 0) - 1;
	}
	return balance.reduce((sum, count) => sum + Math.max(0, count), 0);
};
