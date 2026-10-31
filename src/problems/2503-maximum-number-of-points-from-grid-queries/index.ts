import { Heap } from "../../internal/heap";

/**
 * 2503. Maximum Number of Points From Grid Queries
 *
 * For each query, starting at the top-left cell, you score a point for
 * every cell you can reach through cells whose values are all strictly
 * less than the query. Returns the points for each query.
 *
 * Answer the queries in increasing order, growing one flood fill: a
 * min-heap holds the frontier, and cells below the query are popped and
 * counted.
 *
 * @see https://leetcode.com/problems/maximum-number-of-points-from-grid-queries/
 * @difficulty Hard
 * @timeComplexity O(m · n log(m · n) + k log k)
 * @spaceComplexity O(m · n + k)
 *
 * @example
 * maximumNumberOfPointsFromGridQueries([[1, 2, 3], [2, 5, 7], [3, 5, 1]], [5, 6, 2]); // [5, 8, 1]
 */
export const maximumNumberOfPointsFromGridQueries = (
	grid: readonly (readonly number[])[],
	queries: readonly number[],
): number[] => {
	const rows = grid.length;
	const cols = grid[0]?.length ?? 0;
	const seen = new Uint8Array(rows * cols);
	const frontier = new Heap<[value: number, cell: number]>(
		(a, b) => a[0] - b[0],
		[[grid[0]?.[0] ?? 0, 0]],
	);
	seen[0] = 1;

	const order = queries
		.map((_, i) => i)
		.sort((a, b) => (queries[a] ?? 0) - (queries[b] ?? 0));
	const answer = queries.map(() => 0);
	let points = 0;
	for (const i of order) {
		const query = queries[i] ?? 0;
		for (
			let top = frontier.peek();
			top && top[0] < query;
			top = frontier.peek()
		) {
			frontier.pop();
			points++;
			const r = Math.floor(top[1] / cols);
			const c = top[1] % cols;
			for (const [nr, nc] of [
				[r - 1, c],
				[r + 1, c],
				[r, c - 1],
				[r, c + 1],
			] as const) {
				if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
				const cell = nr * cols + nc;
				if (seen[cell]) continue;
				seen[cell] = 1;
				frontier.push([grid[nr]?.[nc] ?? 0, cell]);
			}
		}
		answer[i] = points;
	}
	return answer;
};
