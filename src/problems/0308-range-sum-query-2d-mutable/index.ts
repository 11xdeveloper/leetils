/**
 * 308. Range Sum Query 2D - Mutable
 *
 * Built from a matrix, handles updates to single cells and queries for the
 * sum of the cells in the rectangle from `(row1, col1)` to `(row2, col2)`,
 * inclusive.
 *
 * A 2D Fenwick tree: a Fenwick tree over rows whose entries are Fenwick
 * trees over columns. Updates and prefix sums each touch O(log m · log n)
 * entries, and a rectangle's sum combines four prefix sums.
 *
 * @see https://leetcode.com/problems/range-sum-query-2d-mutable/
 * @difficulty Medium
 * @timeComplexity O(m n log m log n) to build, O(log m · log n) per update or query
 * @spaceComplexity O(m * n)
 *
 * @example
 * const sums = new RangeSumQuery2dMutable([[3, 0, 1], [5, 6, 3]]);
 * sums.sumRegion(0, 0, 1, 1); // 14
 * sums.update(0, 0, 10);
 * sums.sumRegion(0, 0, 1, 1); // 21
 */
export class RangeSumQuery2dMutable {
	readonly #matrix: number[][];
	readonly #tree: number[][];

	constructor(matrix: readonly (readonly number[])[]) {
		const rows = matrix.length;
		const columns = matrix[0]?.length ?? 0;
		this.#matrix = Array.from({ length: rows }, () =>
			new Array<number>(columns).fill(0),
		);
		this.#tree = Array.from({ length: rows + 1 }, () =>
			new Array<number>(columns + 1).fill(0),
		);
		for (const [r, row] of matrix.entries()) {
			for (const [c, value] of row.entries()) this.update(r, c, value);
		}
	}

	update(row: number, col: number, val: number): void {
		const cells = this.#matrix[row];
		if (!cells) return;
		const delta = val - (cells[col] ?? 0);
		cells[col] = val;
		for (let r = row + 1; r < this.#tree.length; r += r & -r) {
			const treeRow = this.#tree[r] ?? [];
			for (let c = col + 1; c < treeRow.length; c += c & -c)
				treeRow[c] = (treeRow[c] ?? 0) + delta;
		}
	}

	sumRegion(row1: number, col1: number, row2: number, col2: number): number {
		return (
			this.#prefixSum(row2 + 1, col2 + 1) -
			this.#prefixSum(row1, col2 + 1) -
			this.#prefixSum(row2 + 1, col1) +
			this.#prefixSum(row1, col1)
		);
	}

	/** The sum of the first `rows` rows and `columns` columns. */
	#prefixSum(rows: number, columns: number): number {
		let sum = 0;
		for (let r = rows; r > 0; r -= r & -r) {
			for (let c = columns; c > 0; c -= c & -c) sum += this.#tree[r]?.[c] ?? 0;
		}
		return sum;
	}
}
