/**
 * 2663. Lexicographically Smallest Beautiful String
 *
 * A string is beautiful if it uses only the first `k` letters and has no
 * palindromic substring of length 2 or more. Given a beautiful `s`,
 * returns the smallest beautiful string of the same length that is
 * larger, or "" if there is none.
 *
 * No palindromes just means each letter differs from the two before it.
 * Bump the last letter, carrying leftwards when it runs past `k`; once a
 * letter fits, fill the rest with the smallest letters that fit.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-beautiful-string/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * lexicographicallySmallestBeautifulString("abcz", 26); // "abda"
 */
export const lexicographicallySmallestBeautifulString = (
	s: string,
	k: number,
): string => {
	const letters = [...s].map((c) => c.charCodeAt(0) - 97);
	const n = letters.length;
	const fits = (i: number): boolean =>
		letters[i] !== letters[i - 1] && letters[i] !== letters[i - 2];

	let i = n - 1;
	letters[i] = (letters[i] ?? 0) + 1;
	while (i < n) {
		if ((letters[i] ?? 0) >= k) {
			if (--i < 0) return "";
			letters[i] = (letters[i] ?? 0) + 1;
		} else if (!fits(i)) letters[i] = (letters[i] ?? 0) + 1;
		else if (++i < n) letters[i] = 0;
	}
	return String.fromCharCode(...letters.map((letter) => letter + 97));
};
