/**
 * 2484. Count Palindromic Subsequences
 *
 * Counts the palindromic subsequences of length 5 of the digit string `s`,
 * modulo 10^9 + 7.
 *
 * A palindrome `abcba` has any middle digit. For each middle position,
 * multiply the "ab" subsequences before it by the "ba" ones after it,
 * maintaining counts of digit pairs from both sides.
 *
 * @see https://leetcode.com/problems/count-palindromic-subsequences/
 * @difficulty Hard
 * @timeComplexity O(100 · n)
 * @spaceComplexity O(100)
 *
 * @example
 * countPalindromicSubsequences("103301"); // 2
 */
export const countPalindromicSubsequences = (s: string): number => {
	const MOD = 1_000_000_007;
	const digits = Array.from(s, Number);
	// Suffix counts start with the whole string and lose digits as the middle advances.
	const after = new Array<number>(10).fill(0);
	const afterPairs = new Array<number>(100).fill(0);
	for (let i = digits.length - 1; i >= 0; i--) {
		const d = digits[i] ?? 0;
		for (let b = 0; b < 10; b++)
			afterPairs[d * 10 + b] = (afterPairs[d * 10 + b] ?? 0) + (after[b] ?? 0);
		after[d] = (after[d] ?? 0) + 1;
	}
	const before = new Array<number>(10).fill(0);
	const beforePairs = new Array<number>(100).fill(0);
	let total = 0;
	for (const d of digits) {
		// Remove d from the suffix: it was the first digit of pairs (d, b).
		after[d] = (after[d] ?? 0) - 1;
		for (let b = 0; b < 10; b++)
			afterPairs[d * 10 + b] = (afterPairs[d * 10 + b] ?? 0) - (after[b] ?? 0);
		for (let a = 0; a < 10; a++)
			for (let b = 0; b < 10; b++)
				total =
					(total +
						(((beforePairs[a * 10 + b] ?? 0) * (afterPairs[b * 10 + a] ?? 0)) %
							MOD)) %
					MOD;
		for (let a = 0; a < 10; a++)
			beforePairs[a * 10 + d] =
				(beforePairs[a * 10 + d] ?? 0) + (before[a] ?? 0);
		before[d] = (before[d] ?? 0) + 1;
	}
	return total;
};
