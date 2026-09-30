/**
 * 730. Count Different Palindromic Subsequences
 *
 * Counts the distinct non-empty palindromic subsequences of `s` (letters
 * `a` to `d`), modulo 10^9 + 7.
 *
 * Interval DP over `count[i][j]` for `s[i..j]`. If the ends differ, it's
 * inclusion–exclusion over dropping either end. If they're equal, every
 * palindrome inside can be wrapped in them, doubling the count, plus the
 * letter alone and doubled. When that letter also occurs inside, those
 * short ones are already counted, and with two or more inside, the
 * palindromes between the innermost two copies would be counted twice.
 *
 * @see https://leetcode.com/problems/count-different-palindromic-subsequences/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * countDifferentPalindromicSubsequences("bccb"); // 6: b, c, bb, cc, bcb, bccb
 */
export const countDifferentPalindromicSubsequences = (s: string): number => {
	const MOD = 1_000_000_007;
	const n = s.length;
	const count = new Int32Array(n * n);
	const at = (i: number, j: number): number =>
		i > j ? 0 : (count[i * n + j] ?? 0);

	for (let i = n - 1; i >= 0; i--) {
		count[i * n + i] = 1;
		for (let j = i + 1; j < n; j++) {
			let value: number;
			if (s.charAt(i) !== s.charAt(j)) {
				value = at(i + 1, j) + at(i, j - 1) - at(i + 1, j - 1);
			} else {
				let low = i + 1;
				let high = j - 1;
				while (low <= high && s.charAt(low) !== s.charAt(i)) low++;
				while (low <= high && s.charAt(high) !== s.charAt(i)) high--;
				if (low > high) value = 2 * at(i + 1, j - 1) + 2;
				else if (low === high) value = 2 * at(i + 1, j - 1) + 1;
				else value = 2 * at(i + 1, j - 1) - at(low + 1, high - 1);
			}
			count[i * n + j] = ((value % MOD) + MOD) % MOD;
		}
	}

	return at(0, n - 1);
};
