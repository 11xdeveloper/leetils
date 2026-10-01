/**
 * 749. Contain Virus
 *
 * Infected cells (1) spread to their uninfected neighbours (0) every night.
 * Each day, walls can be built around one infected region, the one that
 * threatens the most uninfected cells; that region then stops spreading.
 * Returns the total number of wall segments used until the virus can't
 * spread any further. Each wall separates one infected cell from one
 * uninfected neighbour.
 *
 * Simulates the days: finds every active region with the cells it
 * threatens and the walls it would need, walls off the most threatening
 * one (marking it -1), and spreads the others.
 *
 * @see https://leetcode.com/problems/contain-virus/
 * @difficulty Hard
 * @timeComplexity O((m · n)^2) in the worst case: O(m · n) per day, and each day walls off a region
 * @spaceComplexity O(m · n)
 *
 * @example
 * containVirus([[1, 1, 1], [1, 0, 1], [1, 1, 1]]); // 4
 */
export const containVirus = (
	isInfected: readonly (readonly number[])[],
): number => {
	const grid = isInfected.map((row) => [...row]);
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const directions = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	] as const;
	let walls = 0;

	for (;;) {
		const seen = new Uint8Array(m * n);
		const regions: {
			cells: number[];
			threatened: Set<number>;
			walls: number;
		}[] = [];
		for (let start = 0; start < m * n; start++) {
			if (seen[start] || grid[Math.floor(start / n)]?.[start % n] !== 1)
				continue;
			const region = {
				cells: [start],
				threatened: new Set<number>(),
				walls: 0,
			};
			seen[start] = 1;
			for (let i = 0; i < region.cells.length; i++) {
				const cell = region.cells[i] ?? 0;
				const [r, c] = [Math.floor(cell / n), cell % n];
				for (const [dr, dc] of directions) {
					const [r2, c2] = [r + dr, c + dc];
					const value = grid[r2]?.[c2];
					if (value === 0) {
						region.threatened.add(r2 * n + c2);
						region.walls++;
					} else if (value === 1 && !seen[r2 * n + c2]) {
						seen[r2 * n + c2] = 1;
						region.cells.push(r2 * n + c2);
					}
				}
			}
			regions.push(region);
		}

		let worst = regions[0];
		for (const region of regions)
			if (region.threatened.size > (worst?.threatened.size ?? 0))
				worst = region;
		if (!worst || worst.threatened.size === 0) return walls;

		walls += worst.walls;
		for (const cell of worst.cells) {
			const row = grid[Math.floor(cell / n)];
			if (row) row[cell % n] = -1;
		}
		for (const region of regions) {
			if (region === worst) continue;
			for (const cell of region.threatened) {
				const row = grid[Math.floor(cell / n)];
				if (row) row[cell % n] = 1;
			}
		}
	}
};
