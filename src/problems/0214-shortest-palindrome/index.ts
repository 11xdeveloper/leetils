/**
 * 214. Shortest Palindrome
 *
 * Returns the shortest palindrome that can be made by adding characters to
 * the front of `s`.
 *
 * The answer keeps the longest palindromic prefix of `s` and puts the rest,
 * reversed, in front. The longest palindromic prefix is the longest prefix of
 * `s` that is also a suffix of its reverse, which the Knuth–Morris–Pratt
 * failure function of `s + "#" + reverse(s)` gives directly. The separator
 * stops a match running across the join.
 *
 * @see https://leetcode.com/problems/shortest-palindrome/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * shortestPalindrome("aacecaaa"); // "aaacecaaa"
 */
export const shortestPalindrome = (s: string): string => {
	const reversed = [...s].reverse().join("");
	const combined = `${s}#${reversed}`;
	const fallback = new Array<number>(combined.length).fill(0);

	for (let i = 1; i < combined.length; i++) {
		let length = fallback[i - 1] ?? 0;
		while (length > 0 && combined[i] !== combined[length])
			length = fallback[length - 1] ?? 0;
		if (combined[i] === combined[length]) length++;
		fallback[i] = length;
	}

	const palindromePrefix = fallback.at(-1) ?? 0;
	return reversed.slice(0, s.length - palindromePrefix) + s;
};
