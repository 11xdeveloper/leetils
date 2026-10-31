/**
 * 3560. Find Minimum Log Transportation Cost
 *
 * Three trucks each carry one log of length at most `k`. Cutting a log of
 * length x into a and x - a costs a(x - a). Returns the cheapest way to
 * ship logs of lengths `n` and `m`.
 *
 * Both are at most 2k, so at most one is too long, and cutting off exactly
 * k is cheapest.
 *
 * @see https://leetcode.com/problems/find-minimum-log-transportation-cost/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * findMinimumLogTransportationCost(6, 5, 5); // 5
 */
export const findMinimumLogTransportationCost = (
	n: number,
	m: number,
	k: number,
): number => {
	const longest = Math.max(n, m);
	return longest <= k ? 0 : k * (longest - k);
};
