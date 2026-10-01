/**
 * 1866. Number of Ways to Rearrange Sticks With K Sticks Visible
 *
 * Counts the arrangements of sticks of lengths `1 … n` in which exactly
 * `k` are visible from the left (taller than all before them), modulo
 * 10^9 + 7.
 *
 * Place sticks from tallest to shortest, each at the very front (visible)
 * or behind one of the earlier ones (hidden): unsigned Stirling numbers of
 * the first kind, `ways[n][k] = ways[n−1][k−1] + (n−1) · ways[n−1][k]`.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-rearrange-sticks-with-k-sticks-visible/
 * @difficulty Hard
 * @timeComplexity O(n · k)
 * @spaceComplexity O(k)
 *
 * @example
 * numberOfWaysToRearrangeSticksWithKSticksVisible(3, 2); // 3
 */
export const numberOfWaysToRearrangeSticksWithKSticksVisible = (
	n: number,
	k: number,
): number => {
	const ways = new Array<number>(k + 1).fill(0);
	ways[0] = 1;
	for (let sticks = 1; sticks <= n; sticks++) {
		for (let visible = Math.min(sticks, k); visible >= 1; visible--) {
			ways[visible] =
				((ways[visible - 1] ?? 0) + (sticks - 1) * (ways[visible] ?? 0)) %
				1_000_000_007;
		}
		ways[0] = 0;
	}
	return ways[k] ?? 0;
};
