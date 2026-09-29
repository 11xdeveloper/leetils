/**
 * 542. 01 Matrix
 *
 * For each cell of a binary matrix, returns the distance (in steps up,
 * down, left or right) to the nearest 0. The matrix has at least one 0.
 *
 * Breadth-first search starting from every 0 at once: cells are reached in
 * order of distance, so the first time a cell is reached gives its answer.
 *
 * @see https://leetcode.com/problems/01-matrix/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * zeroOneMatrix([[0, 0, 0], [0, 1, 0], [1, 1, 1]]); // [[0, 0, 0], [0, 1, 0], [1, 2, 1]]
 */
export const zeroOneMatrix = (
	mat: readonly (readonly number[])[],
): number[][] => {
	const distances = mat.map((row) =>
		row.map((cell): number => (cell === 0 ? 0 : -1)),
	);
	const queue: [number, number][] = [];
	for (const [r, row] of mat.entries()) {
		for (const [c, cell] of row.entries()) if (cell === 0) queue.push([r, c]);
	}

	for (const [r, c] of queue) {
		const distance = distances[r]?.[c] ?? 0;
		for (const [dr, dc] of [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		] as const) {
			const row = distances[r + dr];
			if (row?.[c + dc] === -1) {
				row[c + dc] = distance + 1;
				queue.push([r + dr, c + dc]);
			}
		}
	}

	return distances;
};
