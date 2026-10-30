/**
 * 2397. Maximum Rows Covered by Columns
 *
 * Selects `numSelect` columns of the binary `matrix`; a row is covered
 * when every 1 in it is in a selected column. Returns the most rows that
 * can be covered.
 *
 * With at most 12 columns, try every selection against row bitmasks.
 *
 * @see https://leetcode.com/problems/maximum-rows-covered-by-columns/
 * @difficulty Medium
 * @timeComplexity O(2^n · m)
 * @spaceComplexity O(m)
 *
 * @example
 * maximumRowsCoveredByColumns([[0, 0, 0], [1, 0, 1], [0, 1, 1], [0, 0, 1]], 2); // 3
 */
export const maximumRowsCoveredByColumns = (
	matrix: readonly (readonly number[])[],
	numSelect: number,
): number => {
	const n = matrix[0]?.length ?? 0;
	const rows = matrix.map((row) =>
		row.reduce((mask, cell, c) => (cell ? mask | (1 << c) : mask), 0),
	);
	let best = 0;
	for (let selected = 0; selected < 1 << n; selected++) {
		let bits = 0;
		for (let rest = selected; rest; rest &= rest - 1) bits++;
		if (bits !== numSelect) continue;
		best = Math.max(
			best,
			rows.filter((row) => (row & selected) === row).length,
		);
	}
	return best;
};
