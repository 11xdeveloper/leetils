/**
 * 3344. Maximum Sized Array
 *
 * The largest `n` for which the n × n × n array with entries
 * `i · (j OR k)` (all indices from 0 to n - 1) adds up to at most `s`.
 *
 * The total is (Σ i) · Σ (j OR k), and the second sum counts, per bit, the
 * pairs where either index has it: n² minus the pairs where neither does.
 * The total grows with n, so binary search.
 *
 * @see https://leetcode.com/problems/maximum-sized-array/
 * @difficulty Medium
 * @timeComplexity O(log² s)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumSizedArray(10); // 2
 */
export const maximumSizedArray = (s: number): number => {
	const total = (n: number): number => {
		let orSum = 0;
		for (let bit = 1; bit < n; bit *= 2) {
			const without =
				Math.floor(n / (2 * bit)) * bit + Math.min(n % (2 * bit), bit);
			orSum += bit * (n * n - without * without);
		}
		return ((n * (n - 1)) / 2) * orSum;
	};
	let lo = 1;
	let hi = 2000;
	while (lo < hi) {
		const mid = Math.ceil((lo + hi) / 2);
		if (total(mid) <= s) lo = mid;
		else hi = mid - 1;
	}
	return lo;
};
