/**
 * 631. Design Excel Sum Formula
 *
 * A spreadsheet of `height` rows and columns `A` to `width`, all 0 at first.
 * `set` puts a number in a cell, `get` reads a cell, and `sum` puts a
 * formula in a cell adding up single cells (`"F7"`) and rectangles
 * (`"B3:F7"`), returning its value. A formula keeps updating as the cells
 * it refers to change, until the cell is `set` or given another formula.
 *
 * Each cell stores either a number or its formula, as a count of how many
 * times each cell is referenced (a cell can be counted twice). Reading a
 * formula cell adds up the current values of the cells it refers to.
 * There are no circular references.
 *
 * @see https://leetcode.com/problems/design-excel-sum-formula/
 * @difficulty Hard
 * @timeComplexity O(cells) per `get`, following formulas; O(size of the ranges) per `sum`
 * @spaceComplexity O(cells²) in the worst case, for the formulas
 *
 * @example
 * const excel = new DesignExcelSumFormula(3, "C");
 * excel.set(1, "A", 2);
 * excel.sum(3, "C", ["A1", "A1:B2"]); // 4
 */
export class DesignExcelSumFormula {
	readonly #values = new Map<string, number>();
	readonly #formulas = new Map<string, Map<string, number>>();

	constructor(_height: number, _width: string) {}

	set(row: number, column: string, val: number): void {
		const key = `${column}${row}`;
		this.#formulas.delete(key);
		this.#values.set(key, val);
	}

	get(row: number, column: string): number {
		return this.#read(`${column}${row}`);
	}

	sum(row: number, column: string, numbers: readonly string[]): number {
		const references = new Map<string, number>();
		for (const range of numbers) {
			const [from = "", to = from] = range.split(":");
			const [fromColumn, fromRow] = [from.charCodeAt(0), Number(from.slice(1))];
			const [toColumn, toRow] = [to.charCodeAt(0), Number(to.slice(1))];
			for (let c = fromColumn; c <= toColumn; c++) {
				for (let r = fromRow; r <= toRow; r++) {
					const key = `${String.fromCharCode(c)}${r}`;
					references.set(key, (references.get(key) ?? 0) + 1);
				}
			}
		}

		const key = `${column}${row}`;
		this.#values.delete(key);
		this.#formulas.set(key, references);
		return this.#read(key);
	}

	#read(key: string): number {
		const formula = this.#formulas.get(key);
		if (!formula) return this.#values.get(key) ?? 0;
		let total = 0;
		for (const [reference, count] of formula)
			total += count * this.#read(reference);
		return total;
	}
}
