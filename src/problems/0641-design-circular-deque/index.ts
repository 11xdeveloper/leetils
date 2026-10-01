/**
 * 641. Design Circular Deque
 *
 * A fixed-capacity double-ended queue in a ring buffer. `insertFront`,
 * `insertLast`, `deleteFront` and `deleteLast` return whether they
 * succeeded; `getFront` and `getRear` return the end items, or -1 if it's
 * empty; `isEmpty` and `isFull` report its state.
 *
 * Stores the items in an array of size `k` with the front's index and the
 * number of items, wrapping indices around both ways.
 *
 * @see https://leetcode.com/problems/design-circular-deque/
 * @difficulty Medium
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(k)
 *
 * @example
 * const deque = new DesignCircularDeque(3);
 * deque.insertLast(1); // true
 * deque.insertFront(2); // true
 * deque.getFront(); // 2
 */
export class DesignCircularDeque {
	readonly #items: number[];
	#front = 0;
	#size = 0;

	constructor(k: number) {
		this.#items = new Array<number>(k).fill(0);
	}

	insertFront(value: number): boolean {
		if (this.isFull()) return false;
		this.#front = (this.#front - 1 + this.#items.length) % this.#items.length;
		this.#items[this.#front] = value;
		this.#size++;
		return true;
	}

	insertLast(value: number): boolean {
		if (this.isFull()) return false;
		this.#items[(this.#front + this.#size) % this.#items.length] = value;
		this.#size++;
		return true;
	}

	deleteFront(): boolean {
		if (this.isEmpty()) return false;
		this.#front = (this.#front + 1) % this.#items.length;
		this.#size--;
		return true;
	}

	deleteLast(): boolean {
		if (this.isEmpty()) return false;
		this.#size--;
		return true;
	}

	getFront(): number {
		return this.isEmpty() ? -1 : (this.#items[this.#front] ?? -1);
	}

	getRear(): number {
		return this.isEmpty()
			? -1
			: (this.#items[(this.#front + this.#size - 1) % this.#items.length] ??
					-1);
	}

	isEmpty(): boolean {
		return this.#size === 0;
	}

	isFull(): boolean {
		return this.#size === this.#items.length;
	}
}
