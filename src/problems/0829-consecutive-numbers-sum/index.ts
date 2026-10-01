/**
 * 829. Consecutive Numbers Sum
 *
 * Counts the ways to write `n` as a sum of one or more consecutive positive
 * integers.
 *
 * `k` consecutive numbers starting at `x` sum to `k·x + k(k - 1)/2`, so a
 * run of length `k` works exactly when `n - k(k - 1)/2` is a positive
 * multiple of `k`. That bounds `k` by about `√(2n)`.
 *
 * @see https://leetcode.com/problems/consecutive-numbers-sum/
 * @difficulty Hard
 * @timeComplexity O(√n)
 * @spaceComplexity O(1)
 *
 * @example
 * consecutiveNumbersSum(15); // 4: 15, 7 + 8, 4 + 5 + 6, 1 + 2 + 3 + 4 + 5
 */
export const consecutiveNumbersSum = (n: number): number => {
	let ways = 0;
	for (let k = 1; (k * (k - 1)) / 2 < n; k++) {
		if ((n - (k * (k - 1)) / 2) % k === 0) ways++;
	}
	return ways;
};
