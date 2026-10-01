/**
 * 1656. Design an Ordered Stream
 *
 * A stream of `n` values arriving by id `1 … n` in any order. `insert`
 * stores a value and returns the longest run of values now ready from the
 * stream's pointer onward, advancing it.
 *
 * An array of slots and a pointer to the first empty one.
 *
 * @see https://leetcode.com/problems/design-an-ordered-stream/
 * @difficulty Easy
 * @timeComplexity O(n) in total
 * @spaceComplexity O(n)
 *
 * @example
 * const stream = new DesignAnOrderedStream(5);
 * stream.insert(3, "ccccc"); // []
 * stream.insert(1, "aaaaa"); // ["aaaaa"]
 * stream.insert(2, "bbbbb"); // ["bbbbb", "ccccc"]
 */
export class DesignAnOrderedStream {
	readonly #values: (string | undefined)[];
	#pointer = 0;

	constructor(n: number) {
		this.#values = new Array<string | undefined>(n).fill(undefined);
	}

	insert(idKey: number, value: string): string[] {
		this.#values[idKey - 1] = value;
		const ready: string[] = [];
		for (
			let next = this.#values[this.#pointer];
			next !== undefined;
			next = this.#values[this.#pointer]
		) {
			ready.push(next);
			this.#pointer++;
		}
		return ready;
	}
}
