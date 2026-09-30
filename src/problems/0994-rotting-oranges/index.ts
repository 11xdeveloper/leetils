/**
 * 994. Rotting Oranges
 *
 * In `grid`, 0 is empty, 1 a fresh orange and 2 a rotten one. Each minute,
 * fresh oranges next to rotten ones rot. Returns the minutes until none are
 * fresh, or -1 if some never rot.
 *
 * Breadth-first search from all rotten oranges at once, one minute per
 * level, counting the fresh oranges left.
 *
 * @see https://leetcode.com/problems/rotting-oranges/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * rottingOranges([[2, 1, 1], [1, 1, 0], [0, 1, 1]]); // 4
 */
export const rottingOranges = (
	grid: readonly (readonly number[])[],
): number => {
	const cells = grid.map((row) => [...row]);
	let fresh = 0;
	let frontier: [number, number][] = [];
	for (const [r, row] of cells.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell === 1) fresh++;
			if (cell === 2) frontier.push([r, c]);
		}
	}

	let minutes = 0;
	while (fresh > 0 && frontier.length > 0) {
		const next: [number, number][] = [];
		for (const [r, c] of frontier) {
			for (const [dr, dc] of [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1],
			] as const) {
				const row = cells[r + dr];
				if (row?.[c + dc] !== 1) continue;
				row[c + dc] = 2;
				fresh--;
				next.push([r + dr, c + dc]);
			}
		}
		frontier = next;
		minutes++;
	}
	return fresh === 0 ? minutes : -1;
};
