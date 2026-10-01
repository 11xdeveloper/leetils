/**
 * 1415. The k-th Lexicographical String of All Happy Strings of Length n
 *
 * Happy strings use `a`, `b` and `c` with no letter repeated in a row.
 * Returns the `k`th happy string of length `n` in dictionary order, or `""`
 * if there are fewer than `k`.
 *
 * There are `3 · 2^(n − 1)` of them. The first letter splits them into
 * three equal blocks and each later letter into two, so `k − 1` can be read
 * off block by block.
 *
 * @see https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * theKThLexicographicalStringOfAllHappyStringsOfLengthN(3, 9); // "cab"
 */
export const theKThLexicographicalStringOfAllHappyStringsOfLengthN = (
	n: number,
	k: number,
): string => {
	let block = 2 ** (n - 1);
	if (k > 3 * block) return "";
	let rest = k - 1;
	let result = "abc"[Math.floor(rest / block)] ?? "";
	rest %= block;
	for (let i = 1; i < n; i++) {
		block /= 2;
		const options = [..."abc"].filter((letter) => letter !== result.at(-1));
		result += options[Math.floor(rest / block)] ?? "";
		rest %= block;
	}
	return result;
};
