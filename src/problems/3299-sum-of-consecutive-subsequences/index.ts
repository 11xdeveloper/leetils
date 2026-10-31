const MOD = 1_000_000_007;

/**
 * 3299. Sum of Consecutive Subsequences
 *
 * A consecutive array steps by +1 throughout or by -1 throughout (a single
 * element counts). Returns the total of the values of all consecutive
 * subsequences of `nums`, modulo 10⁹ + 7.
 *
 * For rising subsequences, keep per value the number of subsequences
 * ending in it and the sum of their values. An element x extends every one
 * ending in x - 1 and starts its own. Do the same for falling ones (ending
 * in x + 1), and remove the single elements, which both count.
 *
 * @see https://leetcode.com/problems/sum-of-consecutive-subsequences/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfConsecutiveSubsequences([1, 2]); // 6
 */
export const sumOfConsecutiveSubsequences = (
	nums: readonly number[],
): number => {
	let total = 0;
	for (const step of [1, -1]) {
		const count = new Map<number, number>();
		const sum = new Map<number, number>();
		for (const x of nums) {
			const previous = x - step;
			const ways = ((count.get(previous) ?? 0) + 1) % MOD;
			const added = ((sum.get(previous) ?? 0) + ((ways * x) % MOD)) % MOD;
			count.set(x, ((count.get(x) ?? 0) + ways) % MOD);
			sum.set(x, ((sum.get(x) ?? 0) + added) % MOD);
			total = (total + added) % MOD;
		}
	}
	for (const x of nums) total = (total - x + MOD) % MOD;
	return total;
};
