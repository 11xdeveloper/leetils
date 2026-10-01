/**
 * 1905. Count Sub Islands
 *
 * Counts the islands of `grid2` whose every cell is land in `grid1`.
 *
 * Flood-fill each island of `grid2` (explicit stack), checking every cell
 * against `grid1`.
 *
 * @see https://leetcode.com/problems/count-sub-islands/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * countSubIslands([[1, 1, 1, 0, 0], [0, 1, 1, 1, 1], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 0, 1, 1]], [[1, 1, 1, 0, 0], [0, 0, 1, 1, 1], [0, 1, 0, 0, 0], [1, 0, 1, 1, 0], [0, 1, 0, 1, 0]]); // 3
 */
export const countSubIslands = (
	grid1: readonly (readonly number[])[],
	grid2: readonly (readonly number[])[],
): number => {
	const [rows, cols] = [grid2.length, grid2[0]?.length ?? 0];
	const seen = new Uint8Array(rows * cols);
	let count = 0;
	for (let start = 0; start < rows * cols; start++) {
		if (seen[start] || grid2[Math.floor(start / cols)]?.[start % cols] !== 1)
			continue;
		seen[start] = 1;
		let contained = true;
		const stack = [start];
		for (let cell = stack.pop(); cell !== undefined; cell = stack.pop()) {
			const [r, c] = [Math.floor(cell / cols), cell % cols];
			if (grid1[r]?.[c] !== 1) contained = false;
			for (const [nr, nc] of [
				[r - 1, c],
				[r + 1, c],
				[r, c - 1],
				[r, c + 1],
			] as const) {
				if (
					nr < 0 ||
					nr >= rows ||
					nc < 0 ||
					nc >= cols ||
					seen[nr * cols + nc] ||
					grid2[nr]?.[nc] !== 1
				)
					continue;
				seen[nr * cols + nc] = 1;
				stack.push(nr * cols + nc);
			}
		}
		if (contained) count++;
	}
	return count;
};
