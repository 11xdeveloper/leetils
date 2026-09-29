/**
 * 251. Flatten 2D Vector
 *
 * An iterator over the values of a 2D array, row by row, skipping empty
 * rows.
 *
 * Keeps a row and column position. Before answering `hasNext` or `next`, it
 * moves past any rows that have run out, so both are O(1) on average and
 * the array is never copied.
 *
 * @see https://leetcode.com/problems/flatten-2d-vector/
 * @difficulty Medium
 * @timeComplexity O(1) on average per call
 * @spaceComplexity O(1)
 *
 * @example
 * const vector = new Flatten2dVector([[1, 2], [3], [4]]);
 * vector.next(); // 1
 * vector.next(); // 2
 * vector.hasNext(); // true
 */
export class Flatten2dVector {
	readonly #vec: readonly (readonly number[])[];
	#row = 0;
	#column = 0;

	constructor(vec: readonly (readonly number[])[]) {
		this.#vec = vec;
	}

	/** Returns the next value. There must be one. */
	next(): number {
		this.#skipFinishedRows();
		return this.#vec[this.#row]?.[this.#column++] ?? 0;
	}

	hasNext(): boolean {
		this.#skipFinishedRows();
		return this.#row < this.#vec.length;
	}

	#skipFinishedRows(): void {
		while (
			this.#row < this.#vec.length &&
			this.#column >= (this.#vec[this.#row]?.length ?? 0)
		) {
			this.#row++;
			this.#column = 0;
		}
	}
}
