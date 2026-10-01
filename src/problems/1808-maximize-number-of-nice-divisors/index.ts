const MOD = 1_000_000_007n;

const power = (base: bigint, exponent: number): bigint => {
	let [result, square, rest] = [1n, base % MOD, exponent];
	for (; rest > 0; rest = Math.floor(rest / 2)) {
		if (rest % 2 === 1) result = (result * square) % MOD;
		square = (square * square) % MOD;
	}
	return result;
};

/**
 * 1808. Maximize Number of Nice Divisors
 *
 * With at most `primeFactors` prime factors (counted with multiplicity), a
 * divisor is nice if it is divisible by every prime factor. Returns the
 * most nice divisors possible, modulo 10^9 + 7.
 *
 * With exponents `e₁, e₂, …` summing to `primeFactors`, there are
 * `e₁ · e₂ · …` nice divisors: maximise a product with a fixed sum, which
 * takes as many 3s as possible (swapping a leftover 1 for a pair of 2s).
 *
 * @see https://leetcode.com/problems/maximize-number-of-nice-divisors/
 * @difficulty Hard
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximizeNumberOfNiceDivisors(8); // 18
 */
export const maximizeNumberOfNiceDivisors = (primeFactors: number): number => {
	if (primeFactors <= 3) return primeFactors;
	const threes = Math.floor(primeFactors / 3);
	const rest = primeFactors % 3;
	if (rest === 0) return Number(power(3n, threes));
	if (rest === 1) return Number((power(3n, threes - 1) * 4n) % MOD);
	return Number((power(3n, threes) * 2n) % MOD);
};
