/**
 * 205. Isomorphic Strings
 *
 * Returns whether `s` and `t` are isomorphic: each character of `s` can be
 * replaced by a character of `t`, consistently, to turn `s` into `t`, with
 * no two characters of `s` mapping to the same character.
 *
 * Checks the mapping both ways: each character of `s` must always pair with
 * the same character of `t`, and vice versa.
 *
 * @see https://leetcode.com/problems/isomorphic-strings/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(k) where k is the size of the character set
 *
 * @example
 * isomorphicStrings("egg", "add"); // true
 * isomorphicStrings("badc", "baba"); // false
 */
export const isomorphicStrings = (s: string, t: string): boolean => {
	const forward = new Map<string, string>();
	const backward = new Map<string, string>();

	for (let i = 0; i < s.length; i++) {
		const a = s.charAt(i);
		const b = t.charAt(i);
		if ((forward.get(a) ?? b) !== b || (backward.get(b) ?? a) !== a)
			return false;
		forward.set(a, b);
		backward.set(b, a);
	}

	return true;
};
