/**
 * 1670. Design Front Middle Back Queue
 *
 * A queue supporting pushes and pops at the front, the middle and the
 * back. With two middle positions, the frontmost one is used.
 *
 * Two halves, kept so the back half has the same number of items as the
 * front or one more. The middle is then the end of the front half or the
 * start of the back, and each operation moves at most one item across.
 *
 * @see https://leetcode.com/problems/design-front-middle-back-queue/
 * @difficulty Medium
 * @timeComplexity O(n) per operation, for shifting array ends
 * @spaceComplexity O(n)
 *
 * @example
 * const queue = new DesignFrontMiddleBackQueue();
 * queue.pushFront(1);
 * queue.pushBack(2);
 * queue.pushMiddle(3);
 * queue.popMiddle(); // 3
 */
export class DesignFrontMiddleBackQueue {
	#front: number[] = [];
	#back: number[] = [];

	pushFront(val: number): void {
		this.#front.unshift(val);
		this.#balance();
	}

	pushMiddle(val: number): void {
		this.#front.push(val);
		this.#balance();
	}

	pushBack(val: number): void {
		this.#back.push(val);
		this.#balance();
	}

	popFront(): number {
		const val =
			this.#front.length > 0 ? this.#front.shift() : this.#back.shift();
		this.#balance();
		return val ?? -1;
	}

	popMiddle(): number {
		const val =
			this.#front.length === this.#back.length
				? this.#front.pop()
				: this.#back.shift();
		this.#balance();
		return val ?? -1;
	}

	popBack(): number {
		const val = this.#back.pop();
		this.#balance();
		return val ?? -1;
	}

	/** Restores `front.length ≤ back.length ≤ front.length + 1`. */
	#balance(): void {
		while (this.#front.length > this.#back.length)
			this.#back.unshift(this.#front.pop() ?? 0);
		while (this.#back.length > this.#front.length + 1)
			this.#front.push(this.#back.shift() ?? 0);
	}
}
