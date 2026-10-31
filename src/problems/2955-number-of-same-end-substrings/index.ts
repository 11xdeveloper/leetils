/**
 * 2955. Number of Same-End Substrings
 *
 * For each query `[l, r]`, returns how many substrings of `s[l..r]` start
 * and end with the same character.
 *
 * Prefix counts of each letter give its count `c` in the range, which
 * contributes `c(c + 1) / 2` substrings.
 *
 * @see https://leetcode.com/problems/number-of-same-end-substrings/
 * @difficulty Medium
 * @timeComplexity O(26 · (n + q))
 * @spaceComplexity O(26 · n)
 *
 * @example
 * numberOfSameEndSubstrings("abcaab", [[0, 0], [1, 4], [2, 5], [0, 5]]); // [1, 5, 5, 10]
 */
export const numberOfSameEndSubstrings = (
	s: string,
	queries: readonly (readonly number[])[],
): number[] => {
	const prefix = new Int32Array((s.length + 1) * 26);
	for (let i = 0; i < s.length; i++) {
		for (let c = 0; c < 26; c++)
			prefix[(i + 1) * 26 + c] = prefix[i * 26 + c] ?? 0;
		const letter = (i + 1) * 26 + s.charCodeAt(i) - 97;
		prefix[letter] = (prefix[letter] ?? 0) + 1;
	}
	return queries.map(([l = 0, r = 0]) => {
		let total = 0;
		for (let c = 0; c < 26; c++) {
			const count = (prefix[(r + 1) * 26 + c] ?? 0) - (prefix[l * 26 + c] ?? 0);
			total += (count * (count + 1)) / 2;
		}
		return total;
	});
};
