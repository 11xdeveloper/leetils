/**
 * 1895. Largest Magic Square
 *
 * Returns the side of the largest square subgrid of `grid` whose rows,
 * columns and both diagonals all have the same sum.
 *
 * Row and column prefix sums make every line sum constant time; try sizes
 * from largest down and stop at the first magic square.
 *
 * @see https://leetcode.com/problems/largest-magic-square/
 * @difficulty Medium
 * @timeComplexity O(m · n · min(m, n)^2)
 * @spaceComplexity O(mn)
 *
 * @example
 * largestMagicSquare([[7, 1, 4, 5, 6], [2, 5, 1, 6, 4], [1, 5, 4, 3, 2], [1, 2, 7, 3, 4]]); // 3
 */
export const largestMagicSquare = (
	grid: readonly (readonly number[])[],
): number => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const rowPrefix = grid.map((row) => {
		const prefix = [0];
		for (const value of row) prefix.push((prefix.at(-1) ?? 0) + value);
		return prefix;
	});
	const colPrefix = Array.from({ length: n }, (_, c) => {
		const prefix = [0];
		for (const row of grid) prefix.push((prefix.at(-1) ?? 0) + (row[c] ?? 0));
		return prefix;
	});
	const isMagic = (top: number, left: number, size: number) => {
		const target =
			(rowPrefix[top]?.[left + size] ?? 0) - (rowPrefix[top]?.[left] ?? 0);
		for (let r = top; r < top + size; r++) {
			if (
				(rowPrefix[r]?.[left + size] ?? 0) - (rowPrefix[r]?.[left] ?? 0) !==
				target
			)
				return false;
		}
		for (let c = left; c < left + size; c++) {
			if (
				(colPrefix[c]?.[top + size] ?? 0) - (colPrefix[c]?.[top] ?? 0) !==
				target
			)
				return false;
		}
		let [down, up] = [0, 0];
		for (let i = 0; i < size; i++) {
			down += grid[top + i]?.[left + i] ?? 0;
			up += grid[top + i]?.[left + size - 1 - i] ?? 0;
		}
		return down === target && up === target;
	};
	for (let size = Math.min(m, n); size > 1; size--) {
		for (let top = 0; top + size <= m; top++) {
			for (let left = 0; left + size <= n; left++)
				if (isMagic(top, left, size)) return size;
		}
	}
	return 1;
};
