/**
 * 519. Random Flip Matrix
 *
 * An `m × n` matrix starts all 0s. `flip` sets a uniformly random 0 cell to
 * 1 and returns its `[row, col]`; `reset` sets every cell back to 0.
 *
 * Numbers the cells `0` to `m · n - 1` and runs a Fisher–Yates shuffle
 * lazily: the first `remaining` slots of a virtual array hold the cells
 * still 0. `flip` picks a random slot, returns its cell, and moves the last
 * slot's cell into it. Only slots that have been swapped are stored, so
 * memory grows with the number of flips, not the matrix size. `random` is
 * the source of randomness, `Math.random` by default.
 *
 * @see https://leetcode.com/problems/random-flip-matrix/
 * @difficulty Medium
 * @timeComplexity O(1) per flip, O(flips since the last reset) per reset
 * @spaceComplexity O(flips)
 *
 * @example
 * const matrix = new RandomFlipMatrix(3, 1);
 * matrix.flip(); // e.g. [1, 0]
 */
export class RandomFlipMatrix {
	readonly #cols: number;
	readonly #cells: number;
	readonly #random: () => number;
	readonly #swapped = new Map<number, number>();
	#remaining: number;

	constructor(m: number, n: number, random: () => number = Math.random) {
		this.#cols = n;
		this.#cells = m * n;
		this.#remaining = this.#cells;
		this.#random = random;
	}

	flip(): number[] {
		const slot = Math.floor(this.#random() * this.#remaining);
		this.#remaining--;
		const cell = this.#swapped.get(slot) ?? slot;
		this.#swapped.set(
			slot,
			this.#swapped.get(this.#remaining) ?? this.#remaining,
		);
		return [Math.floor(cell / this.#cols), cell % this.#cols];
	}

	reset(): void {
		this.#swapped.clear();
		this.#remaining = this.#cells;
	}
}
