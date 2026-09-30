/**
 * 1177. Can Make Palindrome from Substring
 *
 * For each query `[left, right, k]`, returns whether `s[left … right]` can
 * be rearranged, then have up to `k` letters replaced, to make a
 * palindrome.
 *
 * A rearrangement is a palindrome if at most one letter appears an odd
 * number of times, and each replacement can fix two odd letters. So the
 * query holds if `⌊odd / 2⌋ ≤ k`. Prefix bitmasks of letter parities give
 * each substring's odd letters with one XOR.
 *
 * @see https://leetcode.com/problems/can-make-palindrome-from-substring/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * canMakePalindromeFromSubstring("abcda", [[3, 3, 0], [1, 2, 0], [0, 3, 1], [0, 3, 2], [0, 4, 1]]); // [true, false, false, true, true]
 */
export const canMakePalindromeFromSubstring = (
	s: string,
	queries: readonly (readonly number[])[],
): boolean[] => {
	const parity = new Int32Array(s.length + 1);
	for (let i = 0; i < s.length; i++) {
		parity[i + 1] = (parity[i] ?? 0) ^ (1 << (s.charCodeAt(i) - 97));
	}
	return queries.map(([left = 0, right = 0, k = 0]) => {
		let odd = (parity[right + 1] ?? 0) ^ (parity[left] ?? 0);
		let count = 0;
		for (; odd !== 0; odd &= odd - 1) count++;
		return Math.floor(count / 2) <= k;
	});
};
