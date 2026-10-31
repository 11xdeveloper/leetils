const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 2897. Apply Operations on Array to Maximize Sum of Squares
 *
 * An operation replaces two elements `a` and `b` with `a AND b` and
 * `a OR b`. Afterwards you pick `k` elements. Returns the largest sum of
 * their squares, modulo 1e9 + 7.
 *
 * Operations never change how many elements have each bit set, and can
 * move the bits freely. Squares reward concentration, so build each of
 * the `k` numbers greedily from every bit still available.
 *
 * @see https://leetcode.com/problems/apply-operations-on-array-to-maximize-sum-of-squares/
 * @difficulty Hard
 * @timeComplexity O(31 · (n + k))
 * @spaceComplexity O(31)
 *
 * @example
 * applyOperationsOnArrayToMaximizeSumOfSquares([2, 6, 5, 8], 2); // 261
 */
export const applyOperationsOnArrayToMaximizeSumOfSquares = (
	nums: readonly number[],
	k: number,
): number => {
	const bits = Array.from({ length: 31 }, () => 0);
	for (const num of nums)
		for (let b = 0; b < 31; b++)
			if ((num >> b) & 1) bits[b] = (bits[b] ?? 0) + 1;
	let total = 0;
	for (let i = 0; i < k; i++) {
		let value = 0;
		for (let b = 0; b < 31; b++)
			if ((bits[b] ?? 0) > 0) {
				value += 2 ** b;
				bits[b] = (bits[b] ?? 0) - 1;
			}
		const reduced = value % MOD;
		total = (total + multiply(reduced, reduced)) % MOD;
	}
	return total;
};
