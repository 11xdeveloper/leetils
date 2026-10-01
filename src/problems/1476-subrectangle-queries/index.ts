/**
 * 1476. Subrectangle Queries
 *
 * A grid supporting `updateSubrectangle(row1, col1, row2, col2, newValue)`
 * and `getValue(row, col)`.
 *
 * Records updates instead of applying them. A lookup checks the updates
 * from newest to oldest for one covering the cell, falling back to the
 * original grid. With at most 500 operations this beats rewriting cells.
 *
 * @see https://leetcode.com/problems/subrectangle-queries/
 * @difficulty Medium
 * @timeComplexity O(1) per update, O(u) per lookup for u updates
 * @spaceComplexity O(u), plus a copy of the grid
 *
 * @example
 * const grid = new SubrectangleQueries([[1, 2], [3, 4]]);
 * grid.updateSubrectangle(0, 0, 0, 1, 9);
 * grid.getValue(0, 1); // 9
 */
export class SubrectangleQueries {
	readonly #rectangle: number[][];
	readonly #updates: [number, number, number, number, number][] = [];

	constructor(rectangle: readonly (readonly number[])[]) {
		this.#rectangle = rectangle.map((row) => [...row]);
	}

	updateSubrectangle(
		row1: number,
		col1: number,
		row2: number,
		col2: number,
		newValue: number,
	): void {
		this.#updates.push([row1, col1, row2, col2, newValue]);
	}

	getValue(row: number, col: number): number {
		for (let i = this.#updates.length - 1; i >= 0; i--) {
			const [r1, c1, r2, c2, value] = this.#updates[i] ?? [0, 0, -1, -1, 0];
			if (r1 <= row && row <= r2 && c1 <= col && col <= c2) return value;
		}
		return this.#rectangle[row]?.[col] ?? 0;
	}
}
