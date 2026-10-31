/**
 * 3484. Design Spreadsheet
 *
 * A spreadsheet with columns A to Z supporting `setCell`, `resetCell` and
 * `getValue("=X+Y")`, where X and Y are numbers or cell references (empty
 * cells are 0).
 *
 * Store set cells in a map and evaluate each operand.
 *
 * @see https://leetcode.com/problems/design-spreadsheet/
 * @difficulty Medium
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(cells set)
 *
 * @example
 * const sheet = new DesignSpreadsheet(3);
 * sheet.setCell("A1", 10);
 * sheet.getValue("=A1+5"); // 15
 */
export class DesignSpreadsheet {
	readonly #cells = new Map<string, number>();

	constructor(_rows: number) {}

	setCell(cell: string, value: number): void {
		this.#cells.set(cell, value);
	}

	resetCell(cell: string): void {
		this.#cells.delete(cell);
	}

	getValue(formula: string): number {
		return formula
			.slice(1)
			.split("+")
			.reduce(
				(sum, operand) =>
					sum +
					(/^[A-Z]/.test(operand)
						? (this.#cells.get(operand) ?? 0)
						: Number(operand)),
				0,
			);
	}
}
