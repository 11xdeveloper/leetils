/**
 * 329. Longest Increasing Path in a Matrix
 *
 * Returns the length of the longest path through a matrix, moving up, down,
 * left or right, along which the values strictly increase.
 *
 * Increasing moves form a directed acyclic graph. Peeling it layer by layer
 * with Kahn's algorithm (starting from cells with no larger neighbour, the
 * path ends) counts how many layers there are, which is the longest path's
 * length. Unlike a recursive search, this can't overflow the call stack on
 * a large matrix.
 *
 * @see https://leetcode.com/problems/longest-increasing-path-in-a-matrix/
 * @difficulty Hard
 * @timeComplexity O(m * n)
 * @spaceComplexity O(m * n)
 *
 * @example
 * longestIncreasingPathInAMatrix([[9, 9, 4], [6, 6, 8], [2, 1, 1]]); // 4: 1 → 2 → 6 → 9
 */
export const longestIncreasingPathInAMatrix = (
	matrix: readonly (readonly number[])[],
): number => {
	const rows = matrix.length;
	const columns = matrix[0]?.length ?? 0;
	const neighbours = (r: number, c: number): [number, number][] =>
		(
			[
				[r + 1, c],
				[r - 1, c],
				[r, c + 1],
				[r, c - 1],
			] as [number, number][]
		).filter(([nr, nc]) => nr >= 0 && nr < rows && nc >= 0 && nc < columns);

	// larger[i]: how many neighbours of cell i are larger (edges still to remove).
	const larger = new Array<number>(rows * columns).fill(0);
	let layer: [number, number][] = [];
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			const value = matrix[r]?.[c] ?? 0;
			const count = neighbours(r, c).filter(
				([nr, nc]) => (matrix[nr]?.[nc] ?? 0) > value,
			).length;
			larger[r * columns + c] = count;
			if (count === 0) layer.push([r, c]);
		}
	}

	let length = 0;
	while (layer.length > 0) {
		length++;
		const next: [number, number][] = [];
		for (const [r, c] of layer) {
			const value = matrix[r]?.[c] ?? 0;
			for (const [nr, nc] of neighbours(r, c)) {
				if ((matrix[nr]?.[nc] ?? 0) >= value) continue;
				const index = nr * columns + nc;
				larger[index] = (larger[index] ?? 0) - 1;
				if (larger[index] === 0) next.push([nr, nc]);
			}
		}
		layer = next;
	}

	return length;
};
