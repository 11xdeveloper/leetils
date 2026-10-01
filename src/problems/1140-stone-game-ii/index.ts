/**
 * 1140. Stone Game II
 *
 * Alice and Bob alternately take the first `X` remaining piles, for any
 * `1 ≤ X ≤ 2M`, after which `M` becomes `max(M, X)` (starting at 1). Returns
 * the most stones Alice can get when both play to maximise their own.
 *
 * Dynamic programming from the back: `best[i][m]` is the most the player to
 * move can get from piles `i …` with `M = m`. They take `X` piles and then
 * get whatever the opponent leaves of the rest, which is the suffix sum
 * minus the opponent's best.
 *
 * @see https://leetcode.com/problems/stone-game-ii/
 * @difficulty Medium
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^2)
 *
 * @example
 * stoneGameII([2, 7, 9, 4, 4]); // 10
 */
export const stoneGameII = (piles: readonly number[]): number => {
	const n = piles.length;
	const suffix = new Array<number>(n + 1).fill(0);
	for (let i = n - 1; i >= 0; i--)
		suffix[i] = (suffix[i + 1] ?? 0) + (piles[i] ?? 0);
	const best = Array.from({ length: n + 1 }, () =>
		new Array<number>(n + 1).fill(0),
	);
	for (let i = n - 1; i >= 0; i--) {
		const row = best[i] ?? [];
		for (let m = 1; m <= n; m++) {
			if (i + 2 * m >= n) {
				row[m] = suffix[i] ?? 0;
				continue;
			}
			let most = 0;
			for (let x = 1; x <= 2 * m; x++) {
				const opponent = best[i + x]?.[Math.max(m, x)] ?? 0;
				most = Math.max(most, (suffix[i] ?? 0) - opponent);
			}
			row[m] = most;
		}
	}
	return best[0]?.[1] ?? 0;
};
