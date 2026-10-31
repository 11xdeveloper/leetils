/**
 * 3654. Minimum Sum After Divisible Sum Deletions
 *
 * Repeatedly delete a contiguous run whose sum is divisible by `k`, the
 * rest closing up. Returns the smallest possible sum of what remains.
 *
 * Every deletion, including ones made after inner deletions, removes an
 * original run with a sum divisible by k. So for each prefix, either keep
 * its last element or delete back to an earlier prefix with the same sum
 * mod k, keeping the best kept sum for each residue.
 *
 * @see https://leetcode.com/problems/minimum-sum-after-divisible-sum-deletions/
 * @difficulty Medium
 * @timeComplexity O(n + k)
 * @spaceComplexity O(k)
 *
 * @example
 * minimumSumAfterDivisibleSumDeletions([3, 1, 4, 1, 5], 3); // 5
 */
export const minimumSumAfterDivisibleSumDeletions = (
	nums: readonly number[],
	k: number,
): number => {
	const best = new Float64Array(k).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	let kept = 0;
	let residue = 0;
	for (const num of nums) {
		residue = (residue + num) % k;
		kept = Math.min(kept + num, best[residue] ?? 0);
		best[residue] = Math.min(best[residue] ?? 0, kept);
	}
	return kept;
};
