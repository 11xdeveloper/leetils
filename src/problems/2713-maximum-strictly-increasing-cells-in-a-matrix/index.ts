/**
 * 2713. Maximum Strictly Increasing Cells in a Matrix
 *
 * From a cell you may move to any cell in the same row or column with a
 * strictly larger value. Returns the most cells one walk can visit.
 *
 * Process cells by increasing value, keeping the longest walk ending in
 * each row and each column. Cells of equal value are computed together
 * before any of them updates the rows and columns.
 *
 * @see https://leetcode.com/problems/maximum-strictly-increasing-cells-in-a-matrix/
 * @difficulty Hard
 * @timeComplexity O(m · n log(m · n))
 * @spaceComplexity O(m · n)
 *
 * @example
 * maximumStrictlyIncreasingCellsInAMatrix([[3, 1, 6], [-9, 5, 7]]); // 4
 */
export const maximumStrictlyIncreasingCellsInAMatrix = (
	mat: readonly (readonly number[])[],
): number => {
	const cells: [value: number, r: number, c: number][] = [];
	for (const [r, row] of mat.entries())
		for (const [c, value] of row.entries()) cells.push([value, r, c]);
	cells.sort((a, b) => a[0] - b[0]);

	const rowBest = mat.map(() => 0);
	const colBest = (mat[0] ?? []).map(() => 0);
	let best = 0;
	for (let i = 0; i < cells.length; ) {
		let j = i;
		while (j < cells.length && cells[j]?.[0] === cells[i]?.[0]) j++;
		const group = cells.slice(i, j).map(([, r, c]) => {
			const walk = Math.max(rowBest[r] ?? 0, colBest[c] ?? 0) + 1;
			return [r, c, walk] as const;
		});
		for (const [r, c, walk] of group) {
			rowBest[r] = Math.max(rowBest[r] ?? 0, walk);
			colBest[c] = Math.max(colBest[c] ?? 0, walk);
			best = Math.max(best, walk);
		}
		i = j;
	}
	return best;
};
