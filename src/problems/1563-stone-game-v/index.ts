/**
 * 1563. Stone Game V
 *
 * Alice splits the row in two; Bob throws away the part with the larger
 * sum (Alice picks on a tie) and Alice scores the other part's sum, then
 * continues with it. Returns Alice's best total score.
 *
 * Interval dynamic programming with prefix sums: the best score for a range
 * tries every split, keeping the smaller side (or the better of two equal
 * sides).
 *
 * @see https://leetcode.com/problems/stone-game-v/
 * @difficulty Hard
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^2)
 *
 * @example
 * stoneGameV([6, 2, 3, 4, 5, 5]); // 18
 */
export const stoneGameV = (stoneValue: readonly number[]): number => {
	const n = stoneValue.length;
	const prefix = [0];
	for (const value of stoneValue) prefix.push((prefix.at(-1) ?? 0) + value);
	const sum = (i: number, j: number) => (prefix[j + 1] ?? 0) - (prefix[i] ?? 0);
	const best = Array.from({ length: n }, () => new Array<number>(n).fill(0));
	for (let length = 2; length <= n; length++) {
		for (let i = 0; i + length - 1 < n; i++) {
			const j = i + length - 1;
			let most = 0;
			for (let k = i; k < j; k++) {
				const [left, right] = [sum(i, k), sum(k + 1, j)];
				if (left < right) most = Math.max(most, left + (best[i]?.[k] ?? 0));
				else if (left > right)
					most = Math.max(most, right + (best[k + 1]?.[j] ?? 0));
				else
					most = Math.max(
						most,
						left + Math.max(best[i]?.[k] ?? 0, best[k + 1]?.[j] ?? 0),
					);
			}
			const row = best[i];
			if (row) row[j] = most;
		}
	}
	return best[0]?.[n - 1] ?? 0;
};
