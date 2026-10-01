/** The iterator LeetCode passes in: anything with `hasNext` and `next`. */
interface NumberIterator {
	hasNext(): boolean;
	next(): number;
}

/**
 * 284. Peeking Iterator
 *
 * Wraps an iterator, which only supports `hasNext` and `next`, to add
 * `peek`: seeing the next value without moving past it.
 *
 * Always holds the next value in advance, fetching the one after it
 * whenever `next` hands it out. `peek` then just returns the held value.
 *
 * @see https://leetcode.com/problems/peeking-iterator/
 * @difficulty Medium
 * @timeComplexity O(1) per call
 * @spaceComplexity O(1)
 *
 * @example
 * const iterator = new PeekingIterator(iteratorOver([1, 2, 3]));
 * iterator.next(); // 1
 * iterator.peek(); // 2
 * iterator.next(); // 2
 */
export class PeekingIterator {
	readonly #iterator: NumberIterator;
	#hasPeeked: boolean;
	#peeked: number;

	constructor(iterator: NumberIterator) {
		this.#iterator = iterator;
		this.#hasPeeked = iterator.hasNext();
		this.#peeked = this.#hasPeeked ? iterator.next() : 0;
	}

	/** Returns the next value without moving past it. There must be one. */
	peek(): number {
		return this.#peeked;
	}

	/** Returns the next value. There must be one. */
	next(): number {
		const value = this.#peeked;
		this.#hasPeeked = this.#iterator.hasNext();
		this.#peeked = this.#hasPeeked ? this.#iterator.next() : 0;
		return value;
	}

	hasNext(): boolean {
		return this.#hasPeeked;
	}
}
