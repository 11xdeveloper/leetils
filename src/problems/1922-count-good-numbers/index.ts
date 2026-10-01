const MOD = 1_000_000_007n;

/**
 * 1922. Count Good Numbers
 *
 * A digit string is good if digits at even indices are even and those at
 * odd indices are prime. Counts good strings of length `n` (up to 10^15),
 * modulo 10^9 + 7.
 *
 * There are 5 choices at each of the `⌈n/2⌉` even indices and 4 at each of
 * the `⌊n/2⌋` odd ones: two modular powers.
 *
 * @see https://leetcode.com/problems/count-good-numbers/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * countGoodNumbers(4); // 400
 */
export const countGoodNumbers = (n: number): number => {
	const power = (base: bigint, exponent: bigint) => {
		let [result, square, rest] = [1n, base, exponent];
		for (; rest > 0n; rest >>= 1n) {
			if (rest & 1n) result = (result * square) % MOD;
			square = (square * square) % MOD;
		}
		return result;
	};
	const length = BigInt(n);
	return Number((power(5n, (length + 1n) / 2n) * power(4n, length / 2n)) % MOD);
};
