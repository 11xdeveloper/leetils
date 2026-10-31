const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3756. Concatenate Non-Zero Digits and Multiply by Sum II
 *
 * For each query `[l, r]` on the digit string `s`, join the non-zero
 * digits of `s[l..r]` into a number x and multiply it by their sum,
 * modulo 1e9+7.
 *
 * Prefix arrays of the joined value, the count of non-zero digits and the
 * digit sum: a range's joined value is the prefix value at its end minus
 * the earlier prefix shifted by its digit count.
 *
 * @see https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * concatenateNonZeroDigitsAndMultiplyBySumII("10203004", [[0, 7], [1, 3], [4, 6]]); // [12340, 4, 9]
 */
export const concatenateNonZeroDigitsAndMultiplyBySumII = (
	s: string,
	queries: readonly (readonly number[])[],
): number[] => {
	const n = s.length;
	const value = [0];
	const count = [0];
	const sum = [0];
	const powers = [1];
	for (let i = 0; i < n; i++) {
		const d = s.charCodeAt(i) - 48;
		powers.push(multiply(powers[i] ?? 1, 10));
		value.push(
			d === 0 ? (value[i] ?? 0) : (multiply(value[i] ?? 0, 10) + d) % MOD,
		);
		count.push((count[i] ?? 0) + (d === 0 ? 0 : 1));
		sum.push((sum[i] ?? 0) + d);
	}
	return queries.map(([l = 0, r = 0]) => {
		const shift = powers[(count[r + 1] ?? 0) - (count[l] ?? 0)] ?? 1;
		const x =
			((value[r + 1] ?? 0) - multiply(value[l] ?? 0, shift) + MOD) % MOD;
		return multiply(x, ((sum[r + 1] ?? 0) - (sum[l] ?? 0)) % MOD);
	});
};
