/**
 * 622. Design Circular Queue
 *
 * A fixed-capacity first-in first-out queue in a ring buffer. `enQueue`
 * and `deQueue` return whether they succeeded, `Front` and `Rear` return
 * the first and last items (or -1 if empty), and `isEmpty` and `isFull`
 * report its state. The method names follow LeetCode's.
 *
 * Stores the items in an array of size `k`, with the index of the front and
 * the number of items; the rear is found from those, wrapping around.
 *
 * @see https://leetcode.com/problems/design-circular-queue/
 * @difficulty Medium
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(k)
 *
 * @example
 * const queue = new DesignCircularQueue(2);
 * queue.enQueue(1); // true
 * queue.enQueue(2); // true
 * queue.enQueue(3); // false, it's full
 * queue.Rear(); // 2
 */
export class DesignCircularQueue {
	readonly #items: number[];
	#front = 0;
	#size = 0;

	constructor(k: number) {
		this.#items = new Array<number>(k).fill(0);
	}

	enQueue(value: number): boolean {
		if (this.isFull()) return false;
		this.#items[(this.#front + this.#size) % this.#items.length] = value;
		this.#size++;
		return true;
	}

	deQueue(): boolean {
		if (this.isEmpty()) return false;
		this.#front = (this.#front + 1) % this.#items.length;
		this.#size--;
		return true;
	}

	Front(): number {
		return this.isEmpty() ? -1 : (this.#items[this.#front] ?? -1);
	}

	Rear(): number {
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
