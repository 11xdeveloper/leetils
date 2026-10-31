/**
 * 2992. Number of Self-Divisible Permutations
 *
 * A permutation of `1..n`, indexed from 1, is self-divisible if every
 * value is coprime with its position. Returns how many there are.
 *
 * Bitmask DP: fill positions in order, tracking the set of values used.
 *
 * @see https://leetcode.com/problems/number-of-self-divisible-permutations/
 * @difficulty Medium
 * @timeComplexity O(2ⁿ · n)
 * @spaceComplexity O(2ⁿ)
 *
 * @example
 * numberOfSelfDivisiblePermutations(3); // 3
 */
export const numberOfSelfDivisiblePermutations = (n: number): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const ways = Array.from({ length: 1 << n }, () => 0);
	ways[0] = 1;
	for (let used = 0; used < 1 << n; used++) {
		const count = ways[used] ?? 0;
		if (count === 0) continue;
		const position = used.toString(2).replaceAll("0", "").length + 1;
		for (let value = 1; value <= n; value++)
			if (!((used >> (value - 1)) & 1) && gcd(value, position) === 1)
				ways[used | (1 << (value - 1))] =
					(ways[used | (1 << (value - 1))] ?? 0) + count;
	}
	return ways[(1 << n) - 1] ?? 0;
};
