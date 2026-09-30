/**
 * 1368. Minimum Cost to Make at Least One Valid Path in a Grid
 *
 * Each cell's sign points right (1), left (2), down (3) or up (4). Changing
 * a sign costs 1. Returns the least cost to make the signs lead from the
 * top-left to the bottom-right.
 *
 * 0-1 breadth-first search: following a sign costs nothing and moving any
 * other way costs one. Cells are handled in rounds by cost, with free moves
 * staying in the current round.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/
 * @difficulty Hard
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * minimumCostToMakeAtLeastOneValidPathInAGrid([[1, 1, 1, 1], [2, 2, 2, 2], [1, 1, 1, 1], [2, 2, 2, 2]]); // 3
 */
export const minimumCostToMakeAtLeastOneValidPathInAGrid = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const directions = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	] as const;
	const done = new Uint8Array(m * n);
	let round = [0];
	for (let cost = 0; round.length > 0; cost++) {
		const next: number[] = [];
		for (let i = 0; i < round.length; i++) {
			const cell = round[i] ?? 0;
			if (done[cell]) continue;
			done[cell] = 1;
			if (cell === m * n - 1) return cost;
			const [r, c] = [Math.floor(cell / n), cell % n];
			directions.forEach(([dr, dc], d) => {
				const [r2, c2] = [r + dr, c + dc];
				if (r2 < 0 || r2 >= m || c2 < 0 || c2 >= n || done[r2 * n + c2]) return;
				if (grid[r]?.[c] === d + 1) round.push(r2 * n + c2);
				else next.push(r2 * n + c2);
			});
		}
		round = next;
	}
	return -1;
};
