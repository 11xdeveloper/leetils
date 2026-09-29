/**
 * 155. Min Stack
 *
 * A stack that can also return its smallest value, with every operation in
 * constant time.
 *
 * Stores each value together with the smallest value in the stack at the
 * moment it was pushed. Popping restores the previous minimum automatically.
 *
 * @see https://leetcode.com/problems/min-stack/
 * @difficulty Medium
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const stack = new MinStack();
 * stack.push(-2);
 * stack.push(0);
 * stack.push(-3);
 * stack.getMin(); // -3
 * stack.pop();
 * stack.top(); // 0
 * stack.getMin(); // -2
 */
export class MinStack {
	readonly #entries: [value: number, min: number][] = [];

	push(val: number): void {
		const min = this.#entries.at(-1)?.[1] ?? val;
		this.#entries.push([val, Math.min(val, min)]);
	}

	pop(): void {
		this.#entries.pop();
	}

	/** The value on top of the stack. The stack must not be empty. */
	top(): number {
		return this.#entries.at(-1)?.[0] ?? 0;
	}

	/** The smallest value in the stack. The stack must not be empty. */
	getMin(): number {
		return this.#entries.at(-1)?.[1] ?? 0;
	}
}
