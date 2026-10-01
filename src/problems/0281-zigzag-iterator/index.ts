/**
 * 281. Zigzag Iterator
 *
 * An iterator over two arrays that takes their values alternately, one from
 * each in turn, continuing with whichever is left once the other runs out.
 *
 * Keeps a queue of the arrays that still have values, with a position in
 * each. `next` takes a value from the array at the front and moves it to
 * the back if it has more. The same approach handles any number of arrays,
 * as the follow-up asks: the constructor accepts more than two.
 *
 * @see https://leetcode.com/problems/zigzag-iterator/
 * @difficulty Medium
 * @timeComplexity O(1) per call
 * @spaceComplexity O(k) where k is the number of arrays
 *
 * @example
 * const iterator = new ZigzagIterator([1, 2], [3, 4, 5, 6]);
 * // next() returns 1, 3, 2, 4, 5, 6
 */
export class ZigzagIterator {
	readonly #queue: [values: readonly number[], position: number][];
	#head = 0;

	constructor(...vectors: (readonly number[])[]) {
		this.#queue = vectors.filter((v) => v.length > 0).map((v) => [v, 0]);
	}

	/** Returns the next value. There must be one. */
	next(): number {
		const entry = this.#queue[this.#head++];
		if (!entry) return 0;
		const [values, position] = entry;
		if (position + 1 < values.length) this.#queue.push([values, position + 1]);
		return values[position] ?? 0;
	}

	hasNext(): boolean {
		return this.#head < this.#queue.length;
	}
}
