/**
 * 1262. Greatest Sum Divisible by Three
 *
 * Returns the largest sum of some of `nums` that is divisible by 3.
 *
 * Dynamic programming over remainders: `best[r]` is the largest sum so far
 * with remainder `r` mod 3, and each number can extend any of them.
 *
 * @see https://leetcode.com/problems/greatest-sum-divisible-by-three/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * greatestSumDivisibleByThree([3, 6, 5, 1, 8]); // 18
 */
export const greatestSumDivisibleByThree = (
	nums: readonly number[],
): number => {
	let best = [0, -Infinity, -Infinity];
	for (const num of nums) {
		const next = [...best];
		best.forEach((sum, r) => {
			const target = (r + num) % 3;
			next[target] = Math.max(next[target] ?? -Infinity, sum + num);
		});
		best = next;
	}
	return best[0] ?? 0;
};
