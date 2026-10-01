/**
 * 225. Implement Stack using Queues
 *
 * A last-in, first-out stack built on a single first-in, first-out queue,
 * using only queue operations: add to the back and take from the front.
 *
 * After adding a new value to the back, rotates every older value from the
 * front to the back, which leaves the newest value at the front, where the
 * stack's top belongs.
 *
 * @see https://leetcode.com/problems/implement-stack-using-queues/
 * @difficulty Easy
 * @timeComplexity O(n) for push, O(1) for the rest
 * @spaceComplexity O(n)
 *
 * @example
 * const stack = new ImplementStackUsingQueues();
 * stack.push(1);
 * stack.push(2);
 * stack.top(); // 2
 * stack.pop(); // 2
 * stack.empty(); // false
 */
export class ImplementStackUsingQueues {
	readonly #queue: number[] = [];

	push(x: number): void {
		this.#queue.push(x);
		for (let i = 1; i < this.#queue.length; i++) {
			this.#queue.push(this.#queue.shift() ?? 0);
		}
	}

	/** Removes and returns the top value. The stack must not be empty. */
	pop(): number {
		return this.#queue.shift() ?? 0;
	}

	/** The top value. The stack must not be empty. */
	top(): number {
		return this.#queue[0] ?? 0;
	}

	empty(): boolean {
		return this.#queue.length === 0;
	}
}
