/**
 * 784. Letter Case Permutation
 *
 * Returns every string made by changing each letter of `s` to lowercase or
 * uppercase (digits stay the same). Any order is accepted; here letters are
 * varied from the left, lowercase first.
 *
 * Builds the strings a character at a time: each letter doubles the list.
 *
 * @see https://leetcode.com/problems/letter-case-permutation/
 * @difficulty Medium
 * @timeComplexity O(2^L · n) for L letters
 * @spaceComplexity O(2^L · n)
 *
 * @example
 * letterCasePermutation("a1b2"); // ["a1b2", "a1B2", "A1b2", "A1B2"]
 */
export const letterCasePermutation = (s: string): string[] => {
	let results = [""];
	for (const char of s) {
		const lower = char.toLowerCase();
		const upper = char.toUpperCase();
		results =
			lower === upper
				? results.map((prefix) => prefix + char)
				: results.flatMap((prefix) => [prefix + lower, prefix + upper]);
	}
	return results;
};
