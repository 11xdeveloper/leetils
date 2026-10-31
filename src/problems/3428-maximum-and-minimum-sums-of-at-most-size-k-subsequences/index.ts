const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3428. Maximum and Minimum Sums of at Most Size K Subsequences
 *
 * Over every non-empty subsequence of `nums` with at most `k` elements, add
 * up its largest and smallest elements, modulo 10⁹ + 7.
 *
 * Sort. The i-th element is the minimum of the subsequences that pick up to
 * k - 1 others from the n - 1 - i after it, and the maximum of those that
 * pick from the i before it (ties broken by position). Sum those binomial
 * counts from factorial tables.
 *
 * @see https://leetcode.com/problems/maximum-and-minimum-sums-of-at-most-size-k-subsequences/
 * @difficulty Medium
 * @timeComplexity O(n log n + n · k)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumAndMinimumSumsOfAtMostSizeKSubsequences([1, 2, 3], 2); // 24
 */
export const maximumAndMinimumSumsOfAtMostSizeKSubsequences = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const sorted = nums.toSorted((a, b) => a - b);
	const factorial = [1];
	for (let i = 1; i <= n; i++)
		factorial.push(multiply(factorial[i - 1] ?? 1, i));
	const power = (base: number, exponent: number): number => {
		let result = 1;
		let b = base;
		for (let e = exponent; e > 0; e = Math.floor(e / 2)) {
			if (e % 2 === 1) result = multiply(result, b);
			b = multiply(b, b);
		}
		return result;
	};
	const inverse = new Array<number>(n + 1).fill(1);
	inverse[n] = power(factorial[n] ?? 1, MOD - 2);
	for (let i = n; i > 0; i--) inverse[i - 1] = multiply(inverse[i] ?? 1, i);
	const choose = (a: number, b: number): number =>
		b < 0 || b > a
			? 0
			: multiply(
					multiply(factorial[a] ?? 1, inverse[b] ?? 1),
					inverse[a - b] ?? 1,
				);
	const upToK = (pool: number): number => {
		let ways = 0;
		for (let j = 0; j < k && j <= pool; j++)
			ways = (ways + choose(pool, j)) % MOD;
		return ways;
	};
	let total = 0;
	sorted.forEach((value, i) => {
		const times = (upToK(n - 1 - i) + upToK(i)) % MOD;
		total = (total + multiply(value % MOD, times)) % MOD;
	});
	return total;
};
