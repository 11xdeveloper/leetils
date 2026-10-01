/**
 * 242. Valid Anagram
 *
 * Returns whether `t` is an anagram of `s`: the same characters, each the
 * same number of times, in any order.
 *
 * Counts each character of `s` up and each character of `t` down; they're
 * anagrams exactly when every count ends at zero.
 *
 * @see https://leetcode.com/problems/valid-anagram/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(k) where k is the size of the character set
 *
 * @example
 * validAnagram("anagram", "nagaram"); // true
 */
export const validAnagram = (s: string, t: string): boolean => {
	if (s.length !== t.length) return false;

	const counts = new Map<string, number>();
	for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);
	for (const char of t) {
		const count = counts.get(char) ?? 0;
		if (count === 0) return false;
		counts.set(char, count - 1);
	}

	return true;
};
