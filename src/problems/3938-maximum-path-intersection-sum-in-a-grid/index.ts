/**
 * 3938. Maximum Path Intersection Sum in a Grid
 *
 * One path goes from the top-left to the bottom-right moving right or
 * down; another from the bottom-left to the top-right moving right or up.
 * Returns the largest possible sum of the cells they share.
 *
 * One path's row only rises and the other's only falls, so they share
 * exactly one run of cells along a row or a column. A run works when both
 * paths can enter and leave its ends without meeting again: at each end,
 * pick their directions in and out among those inside the grid (none at
 * a path's own start or finish) so they don't coincide. Then take the best
 * run per row and per column with prefix sums, and the best single cell.
 *
 * @see https://leetcode.com/problems/maximum-path-intersection-sum-in-a-grid/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * maximumPathIntersectionSumInAGrid([[4, -2, -3], [-1, -3, -1], [-4, 2, -1]]); // 3
 */
export const maximumPathIntersectionSumInAGrid = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	type Way = "T" | "L" | "B" | "R" | "";
	// Directions each path can arrive from or leave by at a cell ("" when it starts or ends there).
	const firstIn = (r: number, c: number): Way[] => [
		...(r > 0 ? (["T"] as const) : []),
		...(c > 0 ? (["L"] as const) : []),
		...(r === 0 && c === 0 ? ([""] as const) : []),
	];
	const firstOut = (r: number, c: number): Way[] => [
		...(r < m - 1 ? (["B"] as const) : []),
		...(c < n - 1 ? (["R"] as const) : []),
		...(r === m - 1 && c === n - 1 ? ([""] as const) : []),
	];
	const secondIn = (r: number, c: number): Way[] => [
		...(r < m - 1 ? (["B"] as const) : []),
		...(c > 0 ? (["L"] as const) : []),
		...(r === m - 1 && c === 0 ? ([""] as const) : []),
	];
	const secondOut = (r: number, c: number): Way[] => [
		...(r > 0 ? (["T"] as const) : []),
		...(c < n - 1 ? (["R"] as const) : []),
		...(r === 0 && c === n - 1 ? ([""] as const) : []),
	];
	const apart = (a: Way[], b: Way[]): boolean =>
		a.some((x) => b.some((y) => x === "" || y === "" || x !== y));
	let best = Number.NEGATIVE_INFINITY;
	// Single shared cells: all four directions used must differ.
	for (let r = 0; r < m; r++)
		for (let c = 0; c < n; c++) {
			let ok = false;
			for (const a of firstIn(r, c))
				for (const b of firstOut(r, c))
					for (const d of secondIn(r, c))
						for (const e of secondOut(r, c)) {
							const used = [a, b, d, e].filter((x) => x !== "");
							if (new Set(used).size === used.length) ok = true;
						}
			if (ok) best = Math.max(best, grid[r]?.[c] ?? 0);
		}
	/** Best run of length ≥ 2 along a line of cells, given which can start and end one. */
	const bestRun = (
		values: number[],
		canStart: boolean[],
		canEnd: boolean[],
	): void => {
		let prefix = 0;
		let lowest = Number.POSITIVE_INFINITY;
		values.forEach((value, i) => {
			if (i > 0 && canEnd[i] && lowest !== Number.POSITIVE_INFINITY)
				best = Math.max(best, prefix + value - lowest);
			if (canStart[i]) lowest = Math.min(lowest, prefix);
			prefix += value;
		});
	};
	for (let r = 0; r < m; r++) {
		const cells = Array.from({ length: n }, (_, c) => c);
		bestRun(
			cells.map((c) => grid[r]?.[c] ?? 0),
			cells.map((c) => apart(firstIn(r, c), secondIn(r, c))),
			cells.map((c) => apart(firstOut(r, c), secondOut(r, c))),
		);
	}
	for (let c = 0; c < n; c++) {
		const cells = Array.from({ length: m }, (_, r) => r);
		bestRun(
			cells.map((r) => grid[r]?.[c] ?? 0),
			cells.map((r) => apart(firstIn(r, c), secondOut(r, c))),
			cells.map((r) => apart(firstOut(r, c), secondIn(r, c))),
		);
	}
	return best;
};
