/**
 * 304. Range Sum Query 2D - Immutable
 *
 * Built from a matrix that never changes, answers many queries for the sum
 * of the elements in the rectangle from `(row1, col1)` to `(row2, col2)`,
 * inclusive.
 *
 * Stores 2D prefix sums: `prefix[r][c]` is the sum of the rectangle above
 * and to the left of `(r, c)`. Any rectangle's sum is then four prefix sums
 * combined by inclusion–exclusion.
 *
 * @see https://leetcode.com/problems/range-sum-query-2d-immutable/
 * @difficulty Medium
 * @timeComplexity O(m * n) to build, O(1) per query
 * @spaceComplexity O(m * n)
 *
 * @example
 * const sums = new RangeSumQuery2dImmutable([[3, 0, 1], [5, 6, 3], [1, 2, 0]]);
 * sums.sumRegion(1, 1, 2, 2); // 11
 */
export class RangeSumQuery2dImmutable {
	readonly #prefix: number[][];

	constructor(matrix: readonly (readonly number[])[]) {
		const columns = matrix[0]?.length ?? 0;
		this.#prefix = [new Array<number>(columns + 1).fill(0)];
		for (const [r, row] of matrix.entries()) {
			const above = this.#prefix[r] ?? [];
			const sums = [0];
			for (const [c, value] of row.entries()) {
				sums.push(
					value + (sums[c] ?? 0) + (above[c + 1] ?? 0) - (above[c] ?? 0),
				);
			}
			this.#prefix.push(sums);
		}
	}

	sumRegion(row1: number, col1: number, row2: number, col2: number): number {
		const at = (r: number, c: number): number => this.#prefix[r]?.[c] ?? 0;
		return (
			at(row2 + 1, col2 + 1) -
			at(row1, col2 + 1) -
			at(row2 + 1, col1) +
			at(row1, col1)
		);
	}
}
