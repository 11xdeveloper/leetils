/**
 * 479. Largest Palindrome Product
 *
 * Returns the largest palindrome that is the product of two `n`-digit
 * numbers, modulo 1337.
 *
 * Tries palindromes from the largest down, built from their first half,
 * and stops at the first with an `n`-digit factor whose cofactor also has
 * `n` digits. Checking factors from the largest down to the square root is
 * enough. The products can exceed 2^53, so this uses `BigInt`.
 *
 * @see https://leetcode.com/problems/largest-palindrome-product/
 * @difficulty Hard
 * @timeComplexity O(10^n) in the worst case, far less in practice
 * @spaceComplexity O(n)
 *
 * @example
 * largestPalindromeProduct(2); // 987: 99 × 91 = 9009, and 9009 % 1337 = 987
 */
export const largestPalindromeProduct = (n: number): number => {
	if (n === 1) return 9;
	const max = 10n ** BigInt(n) - 1n;

	for (let half = max; half > max / 10n; half--) {
		const text = String(half);
		const palindrome = BigInt(text + [...text].reverse().join(""));
		for (let factor = max; factor * factor >= palindrome; factor--) {
			if (palindrome % factor === 0n) return Number(palindrome % 1337n);
		}
	}

	return 9;
};
