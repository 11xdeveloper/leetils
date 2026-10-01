const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

/**
 * 1994. The Number of Good Subsets
 *
 * A subset is good if its product is a product of distinct primes. Counts
 * the good subsets of `nums` (values 1–30), modulo 10^9 + 7.
 *
 * Each value 2–30 without a squared factor is a set of primes. Count
 * subsets of the distinct values with disjoint prime sets by dynamic
 * programming over prime masks (each value may come from any of its
 * copies), then any number of 1s can join.
 *
 * @see https://leetcode.com/problems/the-number-of-good-subsets/
 * @difficulty Hard
 * @timeComplexity O(n + 30 · 2^10)
 * @spaceComplexity O(2^10)
 *
 * @example
 * theNumberOfGoodSubsets([4, 2, 3, 15]); // 5
 */
export const theNumberOfGoodSubsets = (nums: readonly number[]): number => {
	const MOD = 1_000_000_007;
	const counts = new Array<number>(31).fill(0);
	for (const num of nums) counts[num] = (counts[num] ?? 0) + 1;
	const ways = new Array<number>(1 << PRIMES.length).fill(0);
	ways[0] = 1;
	for (let value = 2; value <= 30; value++) {
		const copies = counts[value] ?? 0;
		if (copies === 0) continue;
		let mask = 0;
		let squareFree = true;
		for (const [i, prime] of PRIMES.entries()) {
			if (value % (prime * prime) === 0) squareFree = false;
			if (value % prime === 0) mask |= 1 << i;
		}
		if (!squareFree) continue;
		for (let used = ways.length - 1; used >= 0; used--) {
			if (used & mask || !ways[used]) continue;
			ways[used | mask] =
				((ways[used | mask] ?? 0) + (ways[used] ?? 0) * copies) % MOD;
		}
	}
	let good = 0;
	for (let mask = 1; mask < ways.length; mask++)
		good = (good + (ways[mask] ?? 0)) % MOD;
	for (let one = 0; one < (counts[1] ?? 0); one++) good = (good * 2) % MOD;
	return good;
};
