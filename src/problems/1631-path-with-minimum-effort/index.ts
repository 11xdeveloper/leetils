import { Heap } from "../../internal/heap";

/**
 * 1631. Path With Minimum Effort
 *
 * Returns the smallest possible largest height difference between
 * neighbouring cells on a path from the top-left to the bottom-right cell
 * of `heights`.
 *
 * Dijkstra's algorithm where a path's cost is its largest step instead of
 * its sum.
 *
 * @see https://leetcode.com/problems/path-with-minimum-effort/
 * @difficulty Medium
 * @timeComplexity O(mn log mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * pathWithMinimumEffort([[1, 2, 2], [3, 8, 2], [5, 3, 5]]); // 2
 */
export const pathWithMinimumEffort = (
	heights: readonly (readonly number[])[],
): number => {
	const [rows, cols] = [heights.length, heights[0]?.length ?? 0];
	const effort = new Array<number>(rows * cols).fill(Infinity);
	effort[0] = 0;
	const heap = new Heap<[effort: number, cell: number]>(
		(a, b) => a[0] - b[0],
		[[0, 0]],
	);
	for (let entry = heap.pop(); entry; entry = heap.pop()) {
		const [current, cell] = entry;
		if (cell === rows * cols - 1) return current;
		if (current > (effort[cell] ?? 0)) continue;
		const [row, col] = [Math.floor(cell / cols), cell % cols];
		const height = heights[row]?.[col] ?? 0;
		for (const [r, c] of [
			[row - 1, col],
			[row + 1, col],
			[row, col - 1],
			[row, col + 1],
		] as const) {
			if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
			const next = Math.max(current, Math.abs((heights[r]?.[c] ?? 0) - height));
			if (next >= (effort[r * cols + c] ?? 0)) continue;
			effort[r * cols + c] = next;
			heap.push([next, r * cols + c]);
		}
	}
	return 0;
};
