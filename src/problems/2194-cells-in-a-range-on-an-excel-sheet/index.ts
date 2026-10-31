/**
 * 2194. Cells in a Range on an Excel Sheet
 *
 * Lists the cells in a range such as `"K1:L2"`, column by column.
 *
 * Loop over the columns, then the rows.
 *
 * @see https://leetcode.com/problems/cells-in-a-range-on-an-excel-sheet/
 * @difficulty Easy
 * @timeComplexity O(cells)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * cellsInARangeOnAnExcelSheet("K1:L2"); // ["K1", "K2", "L1", "L2"]
 */
export const cellsInARangeOnAnExcelSheet = (s: string): string[] => {
	const cells: string[] = [];
	for (let col = s.charCodeAt(0); col <= s.charCodeAt(3); col++) {
		for (let row = Number(s[1]); row <= Number(s[4]); row++)
			cells.push(`${String.fromCharCode(col)}${row}`);
	}
	return cells;
};
