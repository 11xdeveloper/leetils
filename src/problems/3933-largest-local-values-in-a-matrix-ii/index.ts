/**
 * 3933. Largest Local Values in a Matrix II
 *
 * A non-zero cell holding x is a local maximum if no cell within x rows
 * and x columns of it, apart from the four corners exactly x away in both
 * directions, holds more than x. Counts the local maxima.
 *
 * Sparse tables over each row give a row segment's maximum in O(1), so
 * each cell checks its square row by row, trimming the corners on the
 * first and last rows.
 *
 * @see https://leetcode.com/problems/largest-local-values-in-a-matrix-ii/
 * @difficulty Medium
 * @timeComplexity O(n · m · (log m + V))
 * @spaceComplexity O(n · m log m)
 *
 * @example
 * largestLocalValuesInAMatrixII([[1, 0, 1], [0, 1, 0], [1, 0, 1]]); // 5
 */
export const largestLocalValuesInAMatrixII = (
	matrix: readonly (readonly number[])[],
): number => {
	const n = matrix.length;
	const m = matrix[0]?.length ?? 0;
	const tables = matrix.map((row) => {
		const levels: number[][] = [[...row]];
		for (let level = 1; 1 << level <= m; level++) {
			const previous = levels[level - 1] ?? [];
			const half = 1 << (level - 1);
			levels.push(
				Array.from({ length: m - (1 << level) + 1 }, (_, i) =>
					Math.max(previous[i] ?? 0, previous[i + half] ?? 0),
				),
			);
		}
		return levels;
	});
	const rowMax = (r: number, from: number, to: number): number => {
		[from, to] = [Math.max(0, from), Math.min(m - 1, to)];
		if (from > to) return 0;
		const level = 31 - Math.clz32(to - from + 1);
		const row = tables[r]?.[level] ?? [];
		return Math.max(row[from] ?? 0, row[to - (1 << level) + 1] ?? 0);
	};
	let count = 0;
	for (let r = 0; r < n; r++)
		for (let c = 0; c < m; c++) {
			const x = matrix[r]?.[c] ?? 0;
			if (x === 0) continue;
			let ok = true;
			for (
				let row = Math.max(0, r - x);
				row <= Math.min(n - 1, r + x) && ok;
				row++
			) {
				const trim = Math.abs(row - r) === x ? 1 : 0;
				if (rowMax(row, c - x + trim, c + x - trim) > x) ok = false;
			}
			if (ok) count++;
		}
	return count;
};
