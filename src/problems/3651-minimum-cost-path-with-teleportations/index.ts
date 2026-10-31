/**
 * 3651. Minimum Cost Path with Teleportations
 *
 * Travel from the top-left to the bottom-right of `grid` moving right or
 * down, paying each entered cell's value, or teleport for free to any
 * cell whose value is at most the current cell's, at most `k` times.
 * Returns the least cost.
 *
 * Layer the search by teleports used. Each layer starts from the previous
 * one's costs, lets every cell take the cheapest cost among cells at least
 * as valuable (a running minimum over cells by decreasing value), then
 * relaxes the right and down moves.
 *
 * @see https://leetcode.com/problems/minimum-cost-path-with-teleportations/
 * @difficulty Hard
 * @timeComplexity O(m · n · (k + log(m · n)))
 * @spaceComplexity O(m · n)
 *
 * @example
 * minimumCostPathWithTeleportations([[1, 3, 3], [2, 5, 4], [4, 3, 5]], 2); // 7
 */
export const minimumCostPathWithTeleportations = (
	grid: readonly (readonly number[])[],
	k: number,
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const value = (cell: number): number =>
		grid[Math.floor(cell / n)]?.[cell % n] ?? 0;
	const byValue = Array.from({ length: m * n }, (_, i) => i).sort(
		(a, b) => value(b) - value(a),
	);
	const walk = (cost: Float64Array): void => {
		for (let i = 0; i < m; i++)
			for (let j = 0; j < n; j++) {
				const cell = i * n + j;
				const here = value(cell);
				if (i > 0)
					cost[cell] = Math.min(cost[cell] ?? 0, (cost[cell - n] ?? 0) + here);
				if (j > 0)
					cost[cell] = Math.min(cost[cell] ?? 0, (cost[cell - 1] ?? 0) + here);
			}
	};
	let cost = new Float64Array(m * n).fill(Number.POSITIVE_INFINITY);
	cost[0] = 0;
	walk(cost);
	for (let t = 0; t < k; t++) {
		const next = Float64Array.from(cost);
		let best = Number.POSITIVE_INFINITY;
		for (let i = 0; i < byValue.length; ) {
			// Cells with equal values can all reach one another.
			let j = i;
			while (
				j < byValue.length &&
				value(byValue[j] ?? 0) === value(byValue[i] ?? 0)
			)
				best = Math.min(best, cost[byValue[j++] ?? 0] ?? 0);
			for (; i < j; i++)
				next[byValue[i] ?? 0] = Math.min(next[byValue[i] ?? 0] ?? 0, best);
		}
		walk(next);
		cost = next;
	}
	return cost[m * n - 1] ?? 0;
};
