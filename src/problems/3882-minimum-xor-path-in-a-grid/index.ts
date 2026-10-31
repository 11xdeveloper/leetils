/**
 * 3882. Minimum XOR Path in a Grid
 *
 * Walk from the top-left to the bottom-right moving right or down.
 * Returns the smallest XOR of the values along a path.
 *
 * Values are below 1024, so track every XOR reachable at each cell.
 *
 * @see https://leetcode.com/problems/minimum-xor-path-in-a-grid/
 * @difficulty Medium
 * @timeComplexity O(m · n · V)
 * @spaceComplexity O(n · V)
 *
 * @example
 * minimumXorPathInAGrid([[6, 7], [5, 8]]); // 9
 */
export const minimumXorPathInAGrid = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	let size = 1;
	while (size <= Math.max(...grid.flat())) size *= 2;
	let row: Uint8Array[] = [];
	for (let i = 0; i < m; i++) {
		const next: Uint8Array[] = [];
		for (let j = 0; j < n; j++) {
			const value = grid[i]?.[j] ?? 0;
			const reach = new Uint8Array(size);
			if (i === 0 && j === 0) reach[value] = 1;
			for (const from of [row[j], next[j - 1]])
				if (from)
					for (let x = 0; x < size; x++) if (from[x]) reach[x ^ value] = 1;
			next.push(reach);
		}
		row = next;
	}
	return row[n - 1]?.indexOf(1) ?? 0;
};
