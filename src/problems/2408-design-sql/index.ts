/**
 * 2408. Design SQL
 *
 * Tables of strings, each with a fixed number of columns. Inserted rows
 * get ids 1, 2, … per table (ids aren't reused); rows can be deleted and
 * cells read by row id and 1-based column.
 *
 * Store each table's rows by id, with a per-table counter.
 *
 * @see https://leetcode.com/problems/design-sql/
 * @difficulty Medium
 * @timeComplexity O(row length) per insert, O(1) otherwise
 * @spaceComplexity O(total cells)
 *
 * @example
 * const sql = new DesignSql(["one", "two"], [2, 3]);
 * sql.insertRow("two", ["first", "second", "third"]);
 * sql.selectCell("two", 1, 3); // "third"
 */
export class DesignSql {
	readonly #tables = new Map<
		string,
		{ rows: Map<number, readonly string[]>; nextId: number }
	>();

	constructor(names: readonly string[], _columns: readonly number[]) {
		for (const name of names)
			this.#tables.set(name, { rows: new Map(), nextId: 1 });
	}

	insertRow(name: string, row: readonly string[]): void {
		const table = this.#tables.get(name);
		if (!table) return;
		table.rows.set(table.nextId++, [...row]);
	}

	deleteRow(name: string, rowId: number): void {
		this.#tables.get(name)?.rows.delete(rowId);
	}

	selectCell(name: string, rowId: number, columnId: number): string {
		return this.#tables.get(name)?.rows.get(rowId)?.[columnId - 1] ?? "";
	}
}
