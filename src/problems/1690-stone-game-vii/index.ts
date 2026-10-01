/**
 * 1690. Stone Game VII
 *
 * Players alternately remove the leftmost or rightmost stone and score the
 * sum of the stones left. Returns how much more Alice (first) scores than
 * Bob with optimal play.
 *
 * `gap[i][j]` is the best lead the player to move can get on
 * `stones[i … j]`: removing an end scores the remaining sum, minus the
 * opponent's best lead on what is left. Rows are filled from the bottom
 * up, keeping one row.
 *
 * @see https://leetcode.com/problems/stone-game-vii/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * stoneGameVII([5, 3, 1, 4, 2]); // 6
 */
export const stoneGameVII = (stones: readonly number[]): number => {
	const n = stones.length;
	const prefix = [0];
	for (const stone of stones) prefix.push((prefix.at(-1) ?? 0) + stone);
	const sum = (i: number, j: number) => (prefix[j + 1] ?? 0) - (prefix[i] ?? 0);
	// gap[j] holds gap[i][j] for the current i.
	const gap = new Array<number>(n).fill(0);
	for (let i = n - 2; i >= 0; i--) {
		for (let j = i + 1; j < n; j++) {
			gap[j] = Math.max(
				sum(i + 1, j) - (gap[j] ?? 0),
				sum(i, j - 1) - (gap[j - 1] ?? 0),
			);
		}
	}
	return gap[n - 1] ?? 0;
};
