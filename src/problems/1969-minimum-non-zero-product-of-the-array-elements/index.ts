const MOD = 1_000_000_007n;

/**
 * 1969. Minimum Non-Zero Product of the Array Elements
 *
 * Starting from `1 … 2^p − 1` and swapping bits between elements, returns
 * the smallest non-zero product reachable, modulo 10^9 + 7.
 *
 * Pair each `x` with `2^p − 1 − x` and move bits so one becomes 1 and the
 * other `2^p − 2`. That leaves the maximum, `2^p − 1`, times
 * `(2^p − 2)^(2^(p−1) − 1)`.
 *
 * @see https://leetcode.com/problems/minimum-non-zero-product-of-the-array-elements/
 * @difficulty Medium
 * @timeComplexity O(p)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNonZeroProductOfTheArrayElements(3); // 1512
 */
export const minimumNonZeroProductOfTheArrayElements = (p: number): number => {
	const largest = (1n << BigInt(p)) - 1n;
	const power = (base: bigint, exponent: bigint) => {
		let [result, square, rest] = [1n, base % MOD, exponent];
		for (; rest > 0n; rest >>= 1n) {
			if (rest & 1n) result = (result * square) % MOD;
			square = (square * square) % MOD;
		}
		return result;
	};
	return Number(((largest % MOD) * power(largest - 1n, largest / 2n)) % MOD);
};
