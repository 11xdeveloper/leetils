/**
 * 171. Excel Sheet Column Number
 *
 * Returns the column number for an Excel column title: A is 1, Z is 26, AA
 * is 27, AB is 28 and so on.
 *
 * Reads the title as base 26 with digits A–Z standing for 1–26.
 *
 * @see https://leetcode.com/problems/excel-sheet-column-number/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * excelSheetColumnNumber("ZY"); // 701
 */
export const excelSheetColumnNumber = (columnTitle: string): number => {
	let number = 0;

	for (let i = 0; i < columnTitle.length; i++) {
		number = number * 26 + (columnTitle.charCodeAt(i) - 64);
	}

	return number;
};
