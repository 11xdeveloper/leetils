/**
 * 1730. Shortest Path to Get Food
 *
 * In `grid`, `*` is your start, `#` is food, `O` is free and `X` is
 * blocked. Returns the fewest steps to any food, or -1.
 *
 * Breadth-first search from the start.
 *
 * @see https://leetcode.com/problems/shortest-path-to-get-food/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * shortestPathToGetFood([["X", "X", "X", "X", "X", "X"], ["X", "*", "O", "O", "O", "X"], ["X", "O", "O", "#", "O", "X"], ["X", "X", "X", "X", "X", "X"]]); // 3
 */
export const shortestPathToGetFood = (
	grid: readonly (readonly string[])[],
): number => {
	const [rows, cols] = [grid.length, grid[0]?.length ?? 0];
	const seen = new Uint8Array(rows * cols);
	let level: number[] = [];
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (grid[r]?.[c] !== "*") continue;
			level.push(r * cols + c);
			seen[r * cols + c] = 1;
		}
	}
	for (let steps = 0; level.length > 0; steps++) {
		const next: number[] = [];
		for (const cell of level) {
			const [row, col] = [Math.floor(cell / cols), cell % cols];
			if (grid[row]?.[col] === "#") return steps;
			for (const [r, c] of [
				[row - 1, col],
				[row + 1, col],
				[row, col - 1],
				[row, col + 1],
			] as const) {
				if (
					r < 0 ||
					r >= rows ||
					c < 0 ||
					c >= cols ||
					seen[r * cols + c] ||
					grid[r]?.[c] === "X"
				)
					continue;
				seen[r * cols + c] = 1;
				next.push(r * cols + c);
			}
		}
		level = next;
	}
	return -1;
};
