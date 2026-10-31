/**
 * 2217. Find Palindrome With Fixed Length
 *
 * Returns, for each query `q`, the `q`-th smallest positive palindrome
 * with `intLength` digits, or -1 if there aren't that many.
 *
 * A palindrome is determined by its first half, and the `q`-th half is
 * `10^(h - 1) + q - 1`.
 *
 * @see https://leetcode.com/problems/find-palindrome-with-fixed-length/
 * @difficulty Medium
 * @timeComplexity O(q · intLength)
 * @spaceComplexity O(intLength)
 *
 * @example
 * findPalindromeWithFixedLength([1, 2, 3, 4, 5, 90], 3); // [101, 111, 121, 131, 141, 999]
 */
export const findPalindromeWithFixedLength = (
	queries: readonly number[],
	intLength: number,
): number[] => {
	const halfLength = Math.ceil(intLength / 2);
	const first = 10 ** (halfLength - 1);
	return queries.map((q) => {
		const half = first + q - 1;
		if (half >= first * 10) return -1;
		const digits = String(half);
		const mirrored = [...digits.slice(0, intLength - halfLength)]
			.reverse()
			.join("");
		return Number(digits + mirrored);
	});
};
