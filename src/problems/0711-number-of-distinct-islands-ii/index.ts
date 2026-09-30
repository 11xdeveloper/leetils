/**
 * 711. Number of Distinct Islands II
 *
 * Counts the islands of 1s in `grid` (connected up, down, left and right)
 * that differ in shape, where two islands are the same if one can be
 * shifted, rotated by a multiple of 90° and/or reflected onto the other.
 *
 * Collects each island's cells, then applies all 8 rotations and
 * reflections, shifting each so its smallest row and column are 0 and
 * sorting the cells. The smallest of the 8 keys is the same for all
 * islands of one shape.
 *
 * @see https://leetcode.com/problems/number-of-distinct-islands-ii/
 * @difficulty Hard
 * @timeComplexity O(m · n · log(m · n))
 * @spaceComplexity O(m · n)
 *
 * @example
 * numberOfDistinctIslandsII([[1, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 1], [0, 0, 0, 1, 1]]); // 1
 */
export const numberOfDistinctIslandsII = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid[0]?.length ?? 0;
	const seen = new Uint8Array(grid.length * n);
	const transforms: ((r: number, c: number) => [number, number])[] = [
		(r, c) => [r, c],
		(r, c) => [r, -c],
		(r, c) => [-r, c],
		(r, c) => [-r, -c],
		(r, c) => [c, r],
		(r, c) => [c, -r],
		(r, c) => [-c, r],
		(r, c) => [-c, -r],
	];

	const canonical = (cells: [number, number][]): string => {
		let best = "";
		for (const transform of transforms) {
			const moved = cells.map(([r, c]) => transform(r, c));
			const minRow = Math.min(...moved.map(([r]) => r));
			const minCol = Math.min(...moved.map(([, c]) => c));
			const key = moved
				.map(([r, c]) => (r - minRow) * 100 + (c - minCol))
				.sort((a, b) => a - b)
				.join();
			if (best === "" || key < best) best = key;
		}
		return best;
	};

	const shapes = new Set<string>();
	for (const [startRow, row] of grid.entries()) {
		for (const [startCol, cell] of row.entries()) {
			if (cell !== 1 || seen[startRow * n + startCol]) continue;
			const cells: [number, number][] = [];
			seen[startRow * n + startCol] = 1;
			const stack: [number, number][] = [[startRow, startCol]];
			for (let current = stack.pop(); current; current = stack.pop()) {
				const [r, c] = current;
				cells.push([r, c]);
				for (const [dr, dc] of [
					[-1, 0],
					[1, 0],
					[0, -1],
					[0, 1],
				] as const) {
					const [r2, c2] = [r + dr, c + dc];
					if (grid[r2]?.[c2] !== 1 || seen[r2 * n + c2]) continue;
					seen[r2 * n + c2] = 1;
					stack.push([r2, c2]);
				}
			}
			shapes.add(canonical(cells));
		}
	}

	return shapes.size;
};
