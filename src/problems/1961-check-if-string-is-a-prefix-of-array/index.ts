/**
 * 1961. Check If String Is a Prefix of Array
 *
 * Returns whether `s` equals the concatenation of the first `k` words for
 * some `k ≥ 1`.
 *
 * Append words until the concatenation reaches `s`'s length, then compare.
 *
 * @see https://leetcode.com/problems/check-if-string-is-a-prefix-of-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfStringIsAPrefixOfArray("iloveleetcode", ["i", "love", "leetcode", "apples"]); // true
 */
export const checkIfStringIsAPrefixOfArray = (
	s: string,
	words: readonly string[],
): boolean => {
	let prefix = "";
	for (const word of words) {
		prefix += word;
		if (prefix.length >= s.length) return prefix === s;
	}
	return false;
};
