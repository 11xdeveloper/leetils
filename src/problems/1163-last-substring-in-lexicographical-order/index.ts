/**
 * 1163. Last Substring in Lexicographical Order
 *
 * Returns the lexicographically largest substring of `s`, which is always
 * one of its suffixes.
 *
 * Compares two candidate suffixes, starting at `i` and `j`, a character at
 * a time. When they differ after `k` matching characters, the smaller one
 * and every suffix starting within its first `k` characters can be ruled
 * out, as each is beaten by the matching suffix of the other. So each step
 * moves one pointer past what it has compared.
 *
 * @see https://leetcode.com/problems/last-substring-in-lexicographical-order/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1), excluding the result
 *
 * @example
 * lastSubstringInLexicographicalOrder("leetcode"); // "tcode"
 */
export const lastSubstringInLexicographicalOrder = (s: string): string => {
	let [i, j, k] = [0, 1, 0];
	while (j + k < s.length) {
		const [a, b] = [s.charCodeAt(i + k), s.charCodeAt(j + k)];
		if (a === b) {
			k++;
		} else if (a < b) {
			i = Math.max(i + k + 1, j);
			j = i + 1;
			k = 0;
		} else {
			j += k + 1;
			k = 0;
		}
	}
	return s.slice(i);
};
