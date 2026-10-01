/**
 * 168. Excel Sheet Column Title
 *
 * Returns the Excel column title for a column number: 1 is A, 26 is Z, 27 is
 * AA, 28 is AB and so on.
 *
 * Column titles are base 26 with digits A–Z standing for 1–26 and no zero.
 * Subtracting 1 before each division maps the digits onto 0–25.
 *
 * @see https://leetcode.com/problems/excel-sheet-column-title/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * excelSheetColumnTitle(701); // "ZY"
 */
export const excelSheetColumnTitle = (columnNumber: number): string => {
	let title = "";

	for (let rest = columnNumber; rest > 0; rest = Math.floor(rest / 26)) {
		rest--;
		title = String.fromCharCode(65 + (rest % 26)) + title;
	}

	return title;
};
