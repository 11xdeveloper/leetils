/**
 * 5. Longest Palindromic Substring
 *
 * Returns the longest substring of `s` that reads the same forwards and
 * backwards. If several have the same length, returns the first.
 *
 * Uses Manacher's algorithm. Placing a separator between every character
 * gives even- and odd-length palindromes a single centre. Each centre's
 * radius starts from its mirror image inside the rightmost palindrome found
 * so far, so no character is compared more than a constant number of times.
 *
 * @see https://leetcode.com/problems/longest-palindromic-substring/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestPalindromicSubstring("babad"); // "bab"
 * longestPalindromicSubstring("cbbd"); // "bb"
 */
export const longestPalindromicSubstring = (s: string): string => {
	// s[k] sits at t[2k + 1]; the separators sit at the even indices.
	const t = `#${s.split("").join("#")}#`;
	const radius = new Array<number>(t.length).fill(0);
	let center = 0;
	let right = 0;
	let bestCenter = 0;
	let bestRadius = 0;

	for (let i = 0; i < t.length; i++) {
		let r = i < right ? Math.min(right - i, radius[2 * center - i] ?? 0) : 0;
		while (
			i - r - 1 >= 0 &&
			i + r + 1 < t.length &&
			t[i - r - 1] === t[i + r + 1]
		) {
			r++;
		}
		radius[i] = r;

		if (i + r > right) {
			center = i;
			right = i + r;
		}
		if (r > bestRadius) {
			bestCenter = i;
			bestRadius = r;
		}
	}

	// A radius of r in t is a palindrome of length r in s.
	const start = (bestCenter - bestRadius) / 2;
	return s.slice(start, start + bestRadius);
};
