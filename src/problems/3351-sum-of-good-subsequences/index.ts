const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3351. Sum of Good Subsequences
 *
 * A subsequence is good if neighbouring elements differ by exactly 1 (a
 * single element counts). Returns the total of the elements of all good
 * subsequences, modulo 10⁹ + 7.
 *
 * Keep, per value, how many good subsequences end in it and their total.
 * An element x extends every one ending in x - 1 or x + 1 and starts its
 * own, adding x once per subsequence.
 *
 * @see https://leetcode.com/problems/sum-of-good-subsequences/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfGoodSubsequences([1, 2, 1]); // 14
 */
export const sumOfGoodSubsequences = (nums: readonly number[]): number => {
	const count = new Map<number, number>();
	const sum = new Map<number, number>();
	let total = 0;
	for (const x of nums) {
		const ways = ((count.get(x - 1) ?? 0) + (count.get(x + 1) ?? 0) + 1) % MOD;
		const added =
			((sum.get(x - 1) ?? 0) + (sum.get(x + 1) ?? 0) + multiply(ways, x)) % MOD;
		count.set(x, ((count.get(x) ?? 0) + ways) % MOD);
		sum.set(x, ((sum.get(x) ?? 0) + added) % MOD);
		total = (total + added) % MOD;
	}
	return total;
};
