/**
 * 2400. Number of Ways to Reach a Position After Exactly k Steps
 *
 * Counts the ways to go from `startPos` to `endPos` on a number line in
 * exactly `k` steps of ±1, modulo 10^9 + 7.
 *
 * With distance `d`, the walk has `(k + d) / 2` steps towards the end and
 * the rest away: a binomial coefficient, built row by row of Pascal's
 * triangle.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-reach-a-position-after-exactly-k-steps/
 * @difficulty Medium
 * @timeComplexity O(k^2)
 * @spaceComplexity O(k)
 *
 * @example
 * numberOfWaysToReachAPositionAfterExactlyKSteps(1, 2, 3); // 3
 */
export const numberOfWaysToReachAPositionAfterExactlyKSteps = (
	startPos: number,
	endPos: number,
	k: number,
): number => {
	const MOD = 1_000_000_007;
	const distance = Math.abs(endPos - startPos);
	if (distance > k || (k - distance) % 2) return 0;
	let row = [1];
	for (let i = 1; i <= k; i++)
		row = Array.from(
			{ length: i + 1 },
			(_, j) => ((row[j - 1] ?? 0) + (row[j] ?? 0)) % MOD,
		);
	return row[(k + distance) / 2] ?? 0;
};
