/**
 * 3742. Maximum Path Score in a Grid
 *
 * Walk from the top-left of `grid` to the bottom-right moving right or
 * down. A cell holding 0 adds nothing; a 1 adds 1 point and costs 1; a 2
 * adds 2 points and costs 1. Returns the best score with total cost at
 * most `k`, or -1.
 *
 * Dynamic programming over cells and cost spent; a path costs at most
 * m + n - 1, which caps the costs worth tracking.
 *
 * @see https://leetcode.com/problems/maximum-path-score-in-a-grid/
 * @difficulty Medium
 * @timeComplexity O(m · n · min(k, m + n))
 * @spaceComplexity O(n · min(k, m + n))
 *
 * @example
 * maximumPathScoreInAGrid([[0, 1], [2, 0]], 1); // 2
 */
export const maximumPathScoreInAGrid = (
	grid: readonly (readonly number[])[],
	k: number,
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const budget = Math.min(k, m + n);
	const width = budget + 1;
	// best[j * width + c]: top score reaching column j of this row having spent c.
	let best = new Int32Array(n * width).fill(-1);
	for (let i = 0; i < m; i++) {
		const next = new Int32Array(n * width).fill(-1);
		for (let j = 0; j < n; j++) {
			const value = grid[i]?.[j] ?? 0;
			const cost = value > 0 ? 1 : 0;
			for (let c = cost; c <= budget; c++) {
				let from = i === 0 && j === 0 && c === cost ? 0 : -1;
				if (i > 0) from = Math.max(from, best[j * width + c - cost] ?? -1);
				if (j > 0)
					from = Math.max(from, next[(j - 1) * width + c - cost] ?? -1);
				if (from >= 0) next[j * width + c] = from + value;
			}
		}
		best = next;
	}
	let answer = -1;
	for (let c = 0; c <= budget; c++)
		answer = Math.max(answer, best[(n - 1) * width + c] ?? -1);
	return answer;
};
