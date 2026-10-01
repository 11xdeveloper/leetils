/**
 * 200. Number of Islands
 *
 * Counts the islands in a grid of `"1"` (land) and `"0"` (water), where an
 * island is land connected horizontally or vertically. The grid is not
 * modified.
 *
 * Scans for land not yet visited; each one starts a new island, and a
 * breadth-first search from it marks the rest of that island as visited.
 *
 * @see https://leetcode.com/problems/number-of-islands/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(m * n)
 *
 * @example
 * numberOfIslands([["1", "1", "0"], ["0", "0", "1"]]); // 2
 */
export const numberOfIslands = (
	grid: readonly (readonly string[])[],
): number => {
	const rows = grid.length;
	const columns = grid[0]?.length ?? 0;
	const visited = new Uint8Array(rows * columns);
	let islands = 0;

	const visit = (r: number, c: number, queue: [number, number][]): void => {
		if (r < 0 || r >= rows || c < 0 || c >= columns) return;
		if (grid[r]?.[c] !== "1" || visited[r * columns + c] === 1) return;
		visited[r * columns + c] = 1;
		queue.push([r, c]);
	};

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			if (grid[r]?.[c] !== "1" || visited[r * columns + c] === 1) continue;
			islands++;
			const queue: [number, number][] = [];
			visit(r, c, queue);
			for (let head = 0; head < queue.length; head++) {
				const [qr, qc] = queue[head] ?? [0, 0];
				visit(qr + 1, qc, queue);
				visit(qr - 1, qc, queue);
				visit(qr, qc + 1, queue);
				visit(qr, qc - 1, queue);
			}
		}
	}

	return islands;
};
