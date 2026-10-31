const MOD = 1_000_000_007;

/**
 * 2963. Count the Number of Good Partitions
 *
 * A partition into contiguous subarrays is good if no value appears in
 * two of them. Returns the number of good partitions, modulo 1e9 + 7.
 *
 * Each value's first-to-last span can't be cut, so merge overlapping
 * spans into `c` blocks; every boundary between blocks is optional,
 * giving `2^(c - 1)` partitions.
 *
 * @see https://leetcode.com/problems/count-the-number-of-good-partitions/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countTheNumberOfGoodPartitions([1, 2, 1, 3]); // 2
 */
export const countTheNumberOfGoodPartitions = (
	nums: readonly number[],
): number => {
	const last = new Map<number, number>();
	for (const [i, num] of nums.entries()) last.set(num, i);
	let ways = 1;
	let reach = 0;
	for (const [i, num] of nums.entries()) {
		if (i > 0 && i > reach) ways = (ways * 2) % MOD;
		reach = Math.max(reach, last.get(num) ?? i);
	}
	return ways;
};
