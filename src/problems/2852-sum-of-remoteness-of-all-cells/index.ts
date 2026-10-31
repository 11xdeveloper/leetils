/**
 * 2852. Sum of Remoteness of All Cells
 *
 * Cells holding -1 are blocked. A free cell's remoteness is the sum of
 * the values of free cells it can't reach. Returns the total remoteness
 * of all free cells.
 *
 * Every cell of a connected region has the same remoteness: the grand
 * total minus the region's own sum. Flood-fill each region.
 *
 * @see https://leetcode.com/problems/sum-of-remoteness-of-all-cells/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n²)
 *
 * @example
 * sumOfRemotenessOfAllCells([[-1, 1, -1], [5, -1, 4], [-1, 3, -1]]); // 39
 */
export const sumOfRemotenessOfAllCells = (
	grid: readonly (readonly number[])[],
): number => {
	let total = 0;
	for (const row of grid)
		for (const value of row) if (value > 0) total += value;
	const seen = grid.map((row) => row.map((value) => value === -1));
	let remoteness = 0;
	for (const [r, row] of grid.entries())
		for (const c of row.keys()) {
			if (seen[r]?.[c]) continue;
			(seen[r] ?? [])[c] = true;
			let cells = 0;
			let sum = 0;
			const stack: [number, number][] = [[r, c]];
			for (let cell = stack.pop(); cell; cell = stack.pop()) {
				const [i, j] = cell;
				cells++;
				sum += grid[i]?.[j] ?? 0;
				for (const [ni, nj] of [
					[i - 1, j],
					[i + 1, j],
					[i, j - 1],
					[i, j + 1],
				] as const)
					if (seen[ni]?.[nj] === false) {
						(seen[ni] ?? [])[nj] = true;
						stack.push([ni, nj]);
					}
			}
			remoteness += cells * (total - sum);
		}
	return remoteness;
};
