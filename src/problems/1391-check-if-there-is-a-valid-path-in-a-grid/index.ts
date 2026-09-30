/**
 * 1391. Check if There is a Valid Path in a Grid
 *
 * Each cell holds one of six street pieces joining two of its sides.
 * Returns whether the streets connect the top-left cell to the bottom-right.
 *
 * Search from the top-left, moving to a neighbour only when this piece has
 * an opening towards it and the neighbour's piece has the matching opening
 * back.
 *
 * @see https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * checkIfThereIsAValidPathInAGrid([[2, 4, 3], [6, 5, 2]]); // true
 */
export const checkIfThereIsAValidPathInAGrid = (
	grid: readonly (readonly number[])[],
): boolean => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	// Openings as [dr, dc] for streets 1–6: left/right, up/down, left/down,
	// right/down, left/up and right/up.
	const [LEFT, RIGHT, UP, DOWN] = [
		[0, -1],
		[0, 1],
		[-1, 0],
		[1, 0],
	] as const;
	const openings = [
		[],
		[LEFT, RIGHT],
		[UP, DOWN],
		[LEFT, DOWN],
		[RIGHT, DOWN],
		[LEFT, UP],
		[RIGHT, UP],
	] as const;
	const seen = new Uint8Array(m * n);
	seen[0] = 1;
	const stack = [0];
	for (let cell = stack.pop(); cell !== undefined; cell = stack.pop()) {
		if (cell === m * n - 1) return true;
		const [r, c] = [Math.floor(cell / n), cell % n];
		for (const [dr, dc] of openings[grid[r]?.[c] ?? 0] ?? []) {
			const [r2, c2] = [r + dr, c + dc];
			if (r2 < 0 || r2 >= m || c2 < 0 || c2 >= n || seen[r2 * n + c2]) continue;
			const back = openings[grid[r2]?.[c2] ?? 0] ?? [];
			if (!back.some(([br, bc]) => br === -dr && bc === -dc)) continue;
			seen[r2 * n + c2] = 1;
			stack.push(r2 * n + c2);
		}
	}
	return false;
};
