/**
 * 1381. Design a Stack With Increment Operation
 *
 * A stack of at most `maxSize` elements with `push`, `pop` (-1 when empty)
 * and `increment(k, val)`, which adds `val` to the bottom `k` elements.
 *
 * Increments are recorded lazily at the highest element they reach. Popping
 * that element applies the pending amount and hands it down to the element
 * below, so every operation is constant time.
 *
 * @see https://leetcode.com/problems/design-a-stack-with-increment-operation/
 * @difficulty Medium
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(maxSize)
 *
 * @example
 * const stack = new DesignAStackWithIncrementOperation(3);
 * stack.push(1);
 * stack.push(2);
 * stack.increment(5, 100);
 * stack.pop(); // 102
 */
export class DesignAStackWithIncrementOperation {
	readonly #maxSize: number;
	readonly #values: number[] = [];
	readonly #pending: number[] = [];

	constructor(maxSize: number) {
		this.#maxSize = maxSize;
	}

	push(x: number): void {
		if (this.#values.length === this.#maxSize) return;
		this.#values.push(x);
		this.#pending.push(0);
	}

	pop(): number {
		const value = this.#values.pop();
		const pending = this.#pending.pop() ?? 0;
		if (value === undefined) return -1;
		const below = this.#pending.length - 1;
		if (below >= 0)
			this.#pending[below] = (this.#pending[below] ?? 0) + pending;
		return value + pending;
	}

	increment(k: number, val: number): void {
		const top = Math.min(k, this.#values.length) - 1;
		if (top >= 0) this.#pending[top] = (this.#pending[top] ?? 0) + val;
	}
}
