const DIRECTIONS = [
	[1, 1],
	[1, -1],
	[-1, -1],
	[-1, 1],
] as const;

/**
 * 3459. Length of Longest V-Shaped Diagonal Segment
 *
 * A V-shaped segment starts at a 1 and runs diagonally through 2, 0, 2, 0,
 * …, making at most one clockwise 90° turn onto another diagonal. Returns
 * the longest one in the grid.
 *
 * For each direction, count how far an alternating 2/0 run continues from
 * every cell without turning, by dynamic programming against that
 * direction. Then do the same allowing one turn: continue straight, or turn
 * and finish with the straight run in the clockwise direction. A segment is
 * a 1 followed by one of those runs.
 *
 * @see https://leetcode.com/problems/length-of-longest-v-shaped-diagonal-segment/
 * @difficulty Hard
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * lengthOfLongestVShapedDiagonalSegment([[2, 2, 1, 2, 2], [2, 0, 2, 2, 0], [2, 0, 1, 1, 0], [1, 0, 2, 2, 2], [2, 0, 0, 2, 2]]); // 5
 */
export const lengthOfLongestVShapedDiagonalSegment = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const at = (r: number, c: number): number =>
		r < 0 || c < 0 || r >= m || c >= n ? -1 : (grid[r]?.[c] ?? -1);
	/** Fills a table along direction d, visiting cells so each one's successor is done first. */
	const fill = (
		d: number,
		value: (r: number, c: number, table: Int32Array) => number,
	): Int32Array => {
		const [dr, dc] = DIRECTIONS[d] ?? [0, 0];
		const table = new Int32Array(m * n);
		const rows = dr > 0 ? [...Array(m).keys()].reverse() : [...Array(m).keys()];
		const cols = dc > 0 ? [...Array(n).keys()].reverse() : [...Array(n).keys()];
		for (const r of rows)
			for (const c of cols) table[r * n + c] = value(r, c, table);
		return table;
	};
	const straight = DIRECTIONS.map((_, d) => {
		const [dr, dc] = DIRECTIONS[d] ?? [0, 0];
		return fill(d, (r, c, table) => {
			const v = at(r, c);
			if (v !== 0 && v !== 2) return 0;
			return (
				1 +
				(at(r + dr, c + dc) === 2 - v ? (table[(r + dr) * n + c + dc] ?? 0) : 0)
			);
		});
	});
	const turning = DIRECTIONS.map((_, d) => {
		const [dr, dc] = DIRECTIONS[d] ?? [0, 0];
		const t = (d + 1) % 4;
		const [tr, tc] = DIRECTIONS[t] ?? [0, 0];
		return fill(d, (r, c, table) => {
			const v = at(r, c);
			if (v !== 0 && v !== 2) return 0;
			const ahead =
				at(r + dr, c + dc) === 2 - v ? (table[(r + dr) * n + c + dc] ?? 0) : 0;
			const turned =
				at(r + tr, c + tc) === 2 - v
					? (straight[t]?.[(r + tr) * n + c + tc] ?? 0)
					: 0;
			return 1 + Math.max(ahead, turned);
		});
	});
	let best = 0;
	for (let r = 0; r < m; r++)
		for (let c = 0; c < n; c++) {
			if (at(r, c) !== 1) continue;
			best = Math.max(best, 1);
			DIRECTIONS.forEach(([dr, dc], d) => {
				if (at(r + dr, c + dc) === 2)
					best = Math.max(best, 1 + (turning[d]?.[(r + dr) * n + c + dc] ?? 0));
			});
		}
	return best;
};
