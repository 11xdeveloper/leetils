/**
 * 3083. Existence of a Substring in a String and Its Reverse
 *
 * Whether some two-letter substring of `s` is also a substring of `s`
 * reversed.
 *
 * Record the pairs, then look for any pair whose reverse was recorded.
 *
 * @see https://leetcode.com/problems/existence-of-a-substring-in-a-string-and-its-reverse/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * existenceOfASubstringInAStringAndItsReverse("leetcode"); // true
 */
export const existenceOfASubstringInAStringAndItsReverse = (
	s: string,
): boolean => {
	const pairs = new Set<string>();
	for (let i = 1; i < s.length; i++) pairs.add(s.slice(i - 1, i + 1));
	for (let i = 1; i < s.length; i++)
		if (pairs.has(s.charAt(i) + s.charAt(i - 1))) return true;
	return false;
};
