/**
 * 859. Buddy Strings
 *
 * Returns whether swapping exactly two letters of `s` (at different
 * positions) gives `goal`.
 *
 * Equal strings need a repeated letter to swap with itself. Otherwise the
 * strings must differ in exactly two positions holding each other's
 * letters.
 *
 * @see https://leetcode.com/problems/buddy-strings/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * buddyStrings("ab", "ba"); // true
 */
export const buddyStrings = (s: string, goal: string): boolean => {
	if (s.length !== goal.length) return false;
	if (s === goal) return new Set(s).size < s.length;
	const differences = [...s].flatMap((char, i) =>
		char !== goal.charAt(i) ? [i] : [],
	);
	const [i = 0, j = 0] = differences;
	return (
		differences.length === 2 &&
		s.charAt(i) === goal.charAt(j) &&
		s.charAt(j) === goal.charAt(i)
	);
};
