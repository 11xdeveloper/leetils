/**
 * 232. Implement Queue using Stacks
 *
 * A first-in, first-out queue built on two last-in, first-out stacks, using
 * only stack operations: push to the top and pop from the top.
 *
 * New values go on an input stack. When the front is needed and the output
 * stack is empty, the whole input stack is poured into it, which reverses
 * it so the oldest value is on top. Each value is moved once, so every
 * operation is O(1) on average.
 *
 * @see https://leetcode.com/problems/implement-queue-using-stacks/
 * @difficulty Easy
 * @timeComplexity O(1) on average per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const queue = new ImplementQueueUsingStacks();
 * queue.push(1);
 * queue.push(2);
 * queue.peek(); // 1
 * queue.pop(); // 1
 * queue.empty(); // false
 */
export class ImplementQueueUsingStacks {
	readonly #input: number[] = [];
	readonly #output: number[] = [];

	push(x: number): void {
		this.#input.push(x);
	}

	/** Removes and returns the front value. The queue must not be empty. */
	pop(): number {
		this.#refill();
		return this.#output.pop() ?? 0;
	}

	/** The front value. The queue must not be empty. */
	peek(): number {
		this.#refill();
		return this.#output.at(-1) ?? 0;
	}

	empty(): boolean {
		return this.#input.length === 0 && this.#output.length === 0;
	}

	#refill(): void {
		if (this.#output.length > 0) return;
		for (
			let value = this.#input.pop();
			value !== undefined;
			value = this.#input.pop()
		) {
			this.#output.push(value);
		}
	}
}
