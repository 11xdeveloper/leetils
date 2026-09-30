/**
 * 1091. Shortest Path in Binary Matrix
 *
 * Returns the number of cells on the shortest path of 0s from the top-left
 * to the bottom-right of the `n × n` binary `grid`, moving in any of the
 * eight directions, or -1 if there's no such path.
 *
 * Breadth-first search from the top-left corner.
 *
 * @see https://leetcode.com/problems/shortest-path-in-binary-matrix/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * shortestPathInBinaryMatrix([[0, 0, 0], [1, 1, 0], [1, 1, 0]]); // 4
 */
export const shortestPathInBinaryMatrix = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid.length;
	if (grid[0]?.[0] !== 0 || grid[n - 1]?.[n - 1] !== 0) return -1;
	const seen = new Uint8Array(n * n);
	seen[0] = 1;
	let frontier = [[0, 0]];
	for (let length = 1; frontier.length > 0; length++) {
		const next: number[][] = [];
		for (const [r = 0, c = 0] of frontier) {
			if (r === n - 1 && c === n - 1) return length;
			for (let dr = -1; dr <= 1; dr++) {
				for (let dc = -1; dc <= 1; dc++) {
					const [r2, c2] = [r + dr, c + dc];
					if (c2 < 0 || c2 >= n || grid[r2]?.[c2] !== 0 || seen[r2 * n + c2])
						continue;
					seen[r2 * n + c2] = 1;
					next.push([r2, c2]);
				}
			}
		}
		frontier = next;
	}
	return -1;
};
