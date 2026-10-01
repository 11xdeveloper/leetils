/**
 * 1589. Maximum Sum Obtained of Any Permutation
 *
 * Each request `[start, end]` sums `nums[start … end]`. Returns the largest
 * total of all requests over every ordering of `nums`, modulo 10^9 + 7.
 *
 * Counts how many requests cover each position with a difference array;
 * the best ordering puts the largest numbers on the most covered positions.
 *
 * @see https://leetcode.com/problems/maximum-sum-obtained-of-any-permutation/
 * @difficulty Medium
 * @timeComplexity O(n log n + r)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSumObtainedOfAnyPermutation([1, 2, 3, 4, 5], [[1, 3], [0, 1]]); // 19
 */
export const maximumSumObtainedOfAnyPermutation = (
	nums: readonly number[],
	requests: readonly (readonly number[])[],
): number => {
	const n = nums.length;
	const coverage = new Array<number>(n + 1).fill(0);
	for (const [start = 0, end = 0] of requests) {
		coverage[start] = (coverage[start] ?? 0) + 1;
		coverage[end + 1] = (coverage[end + 1] ?? 0) - 1;
	}
	for (let i = 1; i < n; i++)
		coverage[i] = (coverage[i] ?? 0) + (coverage[i - 1] ?? 0);
	const counts = coverage.slice(0, n).sort((a, b) => b - a);
	const sorted = nums.toSorted((a, b) => b - a);
	let total = 0n;
	sorted.forEach((value, i) => {
		total += BigInt(value) * BigInt(counts[i] ?? 0);
	});
	return Number(total % 1_000_000_007n);
};
